package com.six.framework.config;

import java.util.Properties;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.TransactionManagementConfigurer;

import com.alibaba.druid.pool.DruidDataSourceFactory;

/**
 * springboot集成mybatis的基本入口 1）创建数据源 2）创建SqlSessionFactory
 */
@Configuration
@PropertySource("classpath:jdbc.properties")
@EnableTransactionManagement
public class MyBatisConfig implements TransactionManagementConfigurer {

	@Autowired
	private Environment env;

	/**
	 * 创建数据源
	 * 
	 * @Primary 该注解表示在同一个接口有多个实现类可以注入的时候，默认选择哪一个，而不是让@autowire注解报错
	 */
	@Bean
	// @Primary
	public DataSource getDataSource() throws Exception {
		Properties props = new Properties();
		props.put("driverClassName", env.getProperty("jdbc.driverClassName"));
		props.put("url", env.getProperty("jdbc.url"));
		props.put("username", env.getProperty("jdbc.username"));
		props.put("password", env.getProperty("jdbc.password"));

		props.put("filters", env.getProperty("datasource.filters"));
		props.put("maxActive", env.getProperty("datasource.maxActive"));
		props.put("initialSize", env.getProperty("datasource.initialSize"));
		props.put("maxWait", env.getProperty("datasource.maxWait"));
		props.put("minIdle", env.getProperty("datasource.minIdle"));
		props.put("timeBetweenEvictionRunsMillis", env.getProperty("datasource.timeBetweenEvictionRunsMillis"));
		props.put("minEvictableIdleTimeMillis", env.getProperty("datasource.minEvictableIdleTimeMillis"));
		props.put("validationQuery", env.getProperty("datasource.validationQuery"));
		props.put("testWhileIdle", env.getProperty("datasource.testWhileIdle"));
		props.put("testOnBorrow", env.getProperty("datasource.testOnBorrow"));
		props.put("testOnReturn", env.getProperty("datasource.testOnReturn"));
		props.put("poolPreparedStatements", env.getProperty("datasource.poolPreparedStatements"));
		props.put("maxOpenPreparedStatements", env.getProperty("datasource.maxOpenPreparedStatements"));

		return DruidDataSourceFactory.createDataSource(props);
	}

	/**
	 * 根据数据源创建SqlSessionFactory
	 */
	@Bean
	public SqlSessionFactory sqlSessionFactory(DataSource ds) throws Exception {
		SqlSessionFactoryBean fb = new SqlSessionFactoryBean();
		fb.setDataSource(ds);// 指定数据源(这个必须有，否则报错)
		// 下边两句仅仅用于*.xml文件，如果整个持久层操作不需要使用到xml文件的话（只用注解就可以搞定），则不加
		fb.setTypeAliasesPackage(env.getProperty("mybatis.typeAliasesPackage"));
		// 指定基包
		/*
		 * fb.setMapperLocations( new
		 * PathMatchingResourcePatternResolver().getResources(env.getProperty(
		 * "mybatis.mapperLocations")));// 指定xml文件位置
		 */ fb.setConfigLocation(new DefaultResourceLoader().getResource(env.getProperty("mybatis.configLocation")));

		return fb.getObject();
	}

	/**
	 * 配置事务管理器
	 *//*
		 * @Bean // @Primary public DataSourceTransactionManager
		 * transactionManager() throws Exception { return new
		 * DataSourceTransactionManager(getDataSource()); }
		 */

	@Override
	public PlatformTransactionManager annotationDrivenTransactionManager() {
		try {
			return new DataSourceTransactionManager(getDataSource());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;

	}

}
