package com.six.core.orm.transaction;

import com.six.core.logger.SimpleLogger;
import java.util.ArrayDeque;
import java.util.Comparator;
import java.util.Deque;
import java.util.Map;
import java.util.TreeSet;
import javax.annotation.PostConstruct;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.support.DefaultTransactionStatus;

public class TransactionManager extends DataSourceTransactionManager implements ApplicationContextAware {
	SimpleLogger logger = SimpleLogger.getLogger(getClass());
	private static final long serialVersionUID = 5731013280392865386L;
	private ApplicationContext application = null;

	private TreeSet<TransactionInterceptor> interceptors = new TreeSet(new Comparator<TransactionInterceptor>() {
		public int compare(TransactionInterceptor o1, TransactionInterceptor o2) {
			return o1.getOrder() - o2.getOrder();
		}

	});

	@PostConstruct
	private void init() {
		this.logger.info("初始化事务管理器...开始");
		Map<String, TransactionInterceptor> interceptorBeans = this.application
				.getBeansOfType(TransactionInterceptor.class);
		this.logger.info("准备装载事务拦截器");
		for (Map.Entry<String, TransactionInterceptor> entry : interceptorBeans.entrySet()) {
			this.interceptors.add((TransactionInterceptor) entry.getValue());
			this.logger.info("装载事务拦截器-" + (String) entry.getKey());
		}
		this.logger.info("初始化事务管理器...成功");
	}

	protected void doBegin(Object transaction, TransactionDefinition definition) {
		TransactionStatusAdapter p2pTraStatus = createP2PTransactionStatusByTransaction(transaction);
		for (TransactionInterceptor interceptor : this.interceptors) {
			interceptor.onBegin(p2pTraStatus);
		}
		super.doBegin(transaction, definition);
	}

	protected void doCommit(DefaultTransactionStatus status) {
		Deque interceptorsDeque = new ArrayDeque();
		TransactionStatusAdapter p2pTraStatus = createP2PTransactionStatus(status);

		for (TransactionInterceptor interceptor : this.interceptors) {
			interceptor.beforeCommit(p2pTraStatus);
			interceptorsDeque.push(interceptor);
		}

		super.doCommit(status);

		TransactionInterceptor afterInterceptor = null;
		while ((afterInterceptor = (TransactionInterceptor) interceptorsDeque.poll()) != null)
			try {
				afterInterceptor.afterCommit(p2pTraStatus);
			} catch (Exception e) {
				this.logger.error("事务拦截器执行afterCommit()时出现异常。", e);
			}
	}

	protected void doRollback(DefaultTransactionStatus status) {
		super.doRollback(status);
		TransactionStatusAdapter p2pTraStatus = createP2PTransactionStatus(status);
		for (TransactionInterceptor interceptor : this.interceptors)
			try {
				interceptor.afterRollBack(p2pTraStatus);
			} catch (Exception e) {
				this.logger.error("事务拦截器执行回滚时出现异常。", e);
			}
	}

	protected void doCleanupAfterCompletion(Object transaction) {
		TransactionStatusAdapter p2pTraStatus = createP2PTransactionStatusByTransaction(transaction);
		for (TransactionInterceptor interceptor : this.interceptors) {
			try {
				interceptor.onCompletion(p2pTraStatus);
			} catch (Exception e) {
				this.logger.error("清理事务拦截器出错。", e);
			}
		}
		super.doCleanupAfterCompletion(transaction);
	}

	private TransactionStatusAdapter createP2PTransactionStatusByTransaction(Object transaction) {
		return new TransactionStatusAdapter.DefaultTransactionStatus(transaction);
	}

	private TransactionStatusAdapter createP2PTransactionStatus(DefaultTransactionStatus status) {
		return new TransactionStatusAdapter.DefaultTransactionStatus(status.getTransaction());
	}

	public void setApplicationContext(ApplicationContext context) throws BeansException {
		this.application = context;
	}
}