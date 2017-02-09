package com.six.core.utils;

import com.six.core.logger.SimpleLogger;
import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;

public class CommonUtil {
	private static SimpleLogger logger = SimpleLogger.getLogger(CommonUtil.class);

	public static boolean checkPower(long userPurview, long optPurview) {
		long purviewValue = 1 << (int) optPurview;
		return (userPurview & purviewValue) == purviewValue;
	}

	public static boolean isEmpty(String str) {
		return (str == null) || (str.length() == 0) || ("".equals(str.trim()));
	}

	public static String replaceHtmlSymbols(String str) {
		if (StringUtils.isBlank(str)) {
			return str;
		}
		return str.trim().replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;");
	}

	public static String replaceSymbolsHtml(String str) {
		if (StringUtils.isBlank(str)) {
			return str;
		}
		return str.trim().replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", "\"").replaceAll("\t",
				"    ");
	}

	public static boolean isNumeric(String str) {
		if (str.matches("\\d*"))
			return true;
		return false;
	}

	public static boolean isIllegalInt(String sourceStr) {
		boolean ret = false;
		if ((!isBlank(sourceStr)) && (!isEmpty(sourceStr))) {
			Pattern p = Pattern.compile("\\d{1,6}");
			Matcher m = p.matcher(sourceStr.toString());
			if (m.matches())
				ret = true;
			else {
				logger.info("can't format Integer:" + sourceStr);
			}
		}
		return ret;
	}

	public static boolean isBlank(String str) {
		int strLen;
		if ((str == null) || ((strLen = str.length()) == 0))
			return true;
		for (int i = 0; i < strLen; i++) {
			if (!Character.isWhitespace(str.charAt(i))) {
				return false;
			}
		}
		return true;
	}

	public static String replacePlusStr(String str) {
		str = str.replaceAll("\\%", "%25");
		str = str.replaceAll("\\+", "%2B");
		str = str.replaceAll(" ", "%20");
		str = str.replaceAll("\\/", "%2F");
		str = str.replaceAll("\\?", "%3F");
		str = str.replaceAll("\\#", "%23");
		str = str.replaceAll("\\&", "%26");
		str = str.replaceAll("\\=", "%3D");
		return str;
	}

	public static String replaceStrPlus(String str) {
		str = str.replaceAll("%2B", "\\+");
		str = str.replaceAll("%20", " ");
		str = str.replaceAll("%2F", "\\/");
		str = str.replaceAll("%3F", "\\?");
		str = str.replaceAll("%23", "\\#");
		str = str.replaceAll("%26", "\\&");
		str = str.replaceAll("%3D", "\\=");
		str = str.replaceAll("%25", "\\%");
		return str;
	}

	public static double count(double cash, double rate, double year) {
		rate /= 12.0D;
		double trate = rate + 1.0D;
		for (int i = 0; i < year * 12.0D - 1.0D; i++) {
			trate *= (rate + 1.0D);
		}
		double P = cash * trate * rate / (trate - 1.0D);
		return P;
	}

	public static String toChineseCharacter(String moneyIn) {
		String result = "零";
		if (StringUtils.isBlank(moneyIn))
			return result;
		try {
			double money = Double.valueOf(moneyIn).doubleValue();
			double temp = 0.0D;
			long l = Math.abs((long) money);
			BigDecimal bil = new BigDecimal(l);
			if (bil.toString().length() > 14) {
				return result;
			}
			NumberFormat nf = NumberFormat.getInstance();
			nf.setMaximumFractionDigits(2);
			int i = 0;
			String sign = "";
			String tempStr = "";
			String temp1 = "";
			String[] arr = null;
			sign = money < 0.0D ? "负" : "";
			temp = Math.abs(money);
			if (l == temp) {
				result = doForEach(new BigDecimal(temp).multiply(new BigDecimal(100)).toString(), sign);
			} else {
				nf.setMaximumFractionDigits(2);
				temp1 = nf.format(temp);
				arr = temp1.split(",");
				while (i < arr.length) {
					tempStr = tempStr + arr[i];
					i++;
				}
				BigDecimal b = new BigDecimal(tempStr);
				b = b.multiply(new BigDecimal(100));
				tempStr = b.toString();
				if (tempStr.indexOf(".") == tempStr.length() - 3)
					result = doForEach(tempStr.substring(0, tempStr.length() - 3), sign);
				else
					result = doForEach(tempStr.substring(0, tempStr.length() - 3) + "0", sign);
			}
		} catch (Exception e) {
			logger.error("toChineseCharacter  Exception", e);
		}
		return result;
	}

	private static String doForEach(String result, String sign) {
		String flag = "";
		String b_string = "";
		String[] arr = { "分", "角", "圆", "拾", "佰", "仟", "万", "拾", "佰", "仟", "亿", "拾", "佰", "仟", "万", "拾" };
		String[] arr1 = { "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖" };
		boolean zero = true;
		int len = 0;
		int i = 0;
		int z_count = 0;
		if (result == null)
			len = 0;
		else {
			len = result.length();
		}
		while (i < len) {
			flag = result.substring(i, i + 1);
			i++;
			if (flag.equals("0")) {
				if ((len - i == 10) || (len - i == 6) || (len - i == 2) || (len == i)) {
					if (zero) {
						b_string = b_string.substring(0, b_string.length() - 1);
						zero = false;
					}
					if (len - i == 10) {
						b_string = b_string + "亿";
					}
					if (len - i == 6) {
						b_string = b_string + "万";
					}
					if (len - i == 2) {
						b_string = b_string + "圆";
					}
					if (len == i) {
						b_string = b_string + "整";
					}
					z_count = 0;
				} else {
					if (z_count == 0) {
						b_string = b_string + "零";
						zero = true;
					}
					z_count++;
				}
			} else {
				b_string = b_string + arr1[(java.lang.Integer.parseInt(flag) - 1)] + arr[(len - i)];
				z_count = 0;
				zero = false;
			}
		}
		b_string = sign + b_string;
		return b_string;
	}

	public static void main(String[] args) {
		double cash = 100000.0D;
		double rate = 0.11D;
		int year = 1;
		System.out.println("---------------等额本息还款计算--------------");
		System.out.println("本金：" + cash);
		System.out.println("利率：" + rate);
		System.out.println("贷款年限：" + year);
		double Benxi = count(cash, rate, year);
		System.out.println("商业性贷款" + cash + "元" + "贷款年限为" + year + ",每月等额 还本付息额为：" + Benxi);
	}
}