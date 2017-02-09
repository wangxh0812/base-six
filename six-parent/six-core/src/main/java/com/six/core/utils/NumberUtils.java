package com.six.core.utils;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.NumberFormat;

public class NumberUtils {
	/** 数字中默认保留的小位数 */
	public static int DIGIT_DEFAULT_NUM = 2;

	public static String DECIMAL_DEFAULT_FORMAT = "###########0.##";

	/**
	 * Description: 默认构造函数
	 */
	private NumberUtils() {
	}

	/**
	 * Description: 将字符串转化为float数字
	 * 
	 * @param value
	 *            String 待转化的字符串
	 * @return float 转化得到的float数字
	 */
	public static float toSmallFloat(String value) {
		if (value == null) {
			return 0;
		} else {
			return Float.valueOf(value).floatValue();
		}
	}

	/**
	 * Description: 将String转换成Float
	 * 
	 * @param value
	 *            String 待转换的String
	 * @return Float 转换得到的Float
	 * @throws NumberFormatException
	 *             if the value cannot be converted
	 */
	public static Float toFloat(String value) {
		return org.apache.commons.lang3.math.NumberUtils.createFloat(value);
	}

	/**
	 * Description: 将字符串转化为double数字
	 * 
	 * @param value
	 *            String 待转化的字符串
	 * @return double 转化得到的double数字
	 */
	public static double toSmallDouble(String value) {
		if (value == null) {
			return 0;
		} else {
			return Double.valueOf(value).doubleValue();
		}
	}

	/**
	 * Description: 将String转换成Double
	 * 
	 * @param value
	 *            String 待转换的String
	 * @return Double 转换得到的Double
	 * @throws NumberFormatException
	 *             if the value cannot be converted
	 */
	public static Double toDouble(String value) {
		org.apache.commons.lang3.StringUtils.trim(value);
		return org.apache.commons.lang3.math.NumberUtils.createDouble(value);
	}

	/**
	 * Description: 将字符串转化为int数字
	 * 
	 * @param value
	 *            String 待转化的字符串
	 * @return int 转化得到的int数字
	 */
	public static int toSmallInteger(String value) {
		if (value == null) {
			return 0;
		} else {
			return new Integer(value).intValue();
		}
	}

	/**
	 * Description: 将String转换成Integer
	 * 
	 * @param value
	 *            String 待转换的String
	 * @return Integer 转换得到的Integer
	 * @throws NumberFormatException
	 *             if the value cannot be converted
	 */
	public static Integer toInteger(String value) {
		return org.apache.commons.lang3.math.NumberUtils.createInteger(value);
	}

	/**
	 * Description: 将字符串转化为long数字
	 * 
	 * @param value
	 *            String 待转化的字符串
	 * @return long 转化得到的long数字
	 */
	public static long toSmallLong(String value) {
		if (value == null) {
			return 0;
		} else {
			return Long.valueOf(value).longValue();
		}
	}

	/**
	 * Description: 将String转换成Long
	 * 
	 * @param value
	 *            String 待转换的String
	 * @return Long 转换得到的Long
	 * @throws NumberFormatException
	 *             if the value cannot be converted
	 */
	public static Long toLong(String value) {
		return org.apache.commons.lang3.math.NumberUtils.createLong(value);
	}

	/**
	 * Description: 将String转换成Long
	 * 
	 * @param value
	 *            String 待转换的String
	 * @return BigDecimal 转换得到的BigDecimal
	 * @throws NumberFormatException
	 *             if the value cannot be converted
	 */
	public static BigDecimal toBigDecimal(String value) {
		return org.apache.commons.lang3.math.NumberUtils.createBigDecimal(value);
	}

	/**
	 * Description: 将double转化为字符串
	 * 
	 * @param value
	 *            long long数据
	 * @return String 转化后的String
	 * @throws Exception
	 */
	public static String toString(long value) throws Exception {
		return String.valueOf(value);
	}

	/**
	 * Description: 将Long转化为字符串
	 * 
	 * @param value
	 *            Long Long数据
	 * @return String 转化后的String
	 * @throws Exception
	 */
	public static String toString(Long value) throws Exception {
		if (value == null) {
			return null;
		} else {
			return value.toString();
		}
	}

	/**
	 * Description: 将double转化为String
	 * 
	 * @param d
	 *            double数据
	 * @return 转化后的String
	 */
	public static String toString(double d) {
		String str = NumberFormat.getInstance().format(d);
		String str2 = "";
		int i = 0;
		while ((i >= 0) && str.length() > 0) {
			i = str.indexOf(",");
			if (i == -1) {
				str2 += str;
				break;
			} else {
				str2 += str.substring(0, i);
				str = str.substring(i + 1, str.length());
			}
		}
		return str2;
	}

	/**
	 * Description: 将Long转换成BigDecimal
	 * 
	 * @param value
	 *            Long 待转换的Long
	 * @return BigDecimal 转化得到的BigDecimal
	 */
	public static BigDecimal toBigDecimal(Long value) {
		if (value == null) {
			return null;
		}
		return new BigDecimal(value.longValue());
	}

	/**
	 * Description: 将一个double类型的数字进行四舍五入或是截取整数
	 * 
	 * @param dOrigin
	 *            double 待处理的数字
	 * @param nCount
	 *            int 保留小数的位数
	 * @param bDischarge
	 *            boolean 是否截取整数
	 * @return double 处理后的数字
	 */
	private static double getDouble(double amount, int nCount, boolean bDischarge) {
		long lTemp = (long) Math.pow(10, nCount);
		if (bDischarge == true) {
			return (long) (amount * lTemp) / (double) lTemp;
		} else {
			return Math.round(amount * lTemp) / (double) lTemp;
		}
	}

	/**
	 * Description: 默认保留两位小数的四舍五入方法
	 * 
	 * @param amount
	 *            double 待round的数字
	 * @return double round后的数字
	 */
	public static double round(double amount) {
		return round(amount, DIGIT_DEFAULT_NUM);
	}

	/**
	 * Description: 保留指定小数位数的四舍五入方法
	 * 
	 * @param amount
	 *            double 待round的数字
	 * @param digits
	 *            int 保留小数的位数
	 * @return double round后的数字
	 */
	public static double round(double amount, int digits) {
		return getDouble(amount, digits, false);
	}

	/**
	 * Description: 默认保留两位小数的四舍五入方法
	 * 
	 * @param amount
	 *            BigDecimal 待round的数字
	 * @return BigDecimal round后的数字
	 */
	public static BigDecimal round(BigDecimal amount) {
		return round(amount, DIGIT_DEFAULT_NUM);
	}

	/**
	 * Description: 保留指定小数位数的四舍五入方法
	 * 
	 * @param amount
	 *            BigDecimal 待round的数字
	 * @param digits
	 *            int 保留小数的位数
	 * @return BigDecimal round后的数字
	 */
	public static BigDecimal round(BigDecimal amount, int digits) {
		BigDecimal one = new BigDecimal("1");
		return amount.divide(one, digits, BigDecimal.ROUND_HALF_UP);
	}

	/**
	 * Description: 默认保留两位小数的四舍五入方法
	 * 
	 * @param amount
	 *            String 待round的数字
	 * @return BigDecimal round后的数字
	 */
	public static BigDecimal round(String amount) {
		return round(amount, DIGIT_DEFAULT_NUM);
	}

	/**
	 * Description: 保留指定小数位数的四舍五入方法
	 * 
	 * @param amount
	 *            String 待round的数字
	 * @param digits
	 *            int 保留小数的位数
	 * @return BigDecimal round后的数字
	 */
	public static BigDecimal round(String amount, int digits) {
		return round(new BigDecimal(amount), digits);
	}

	/**
	 * Description: 对小数进行round(默认保留两位小数),两位小数后的小数全部截取掉.
	 * round规则:1-5的round为5,6-9的round为0且进位
	 * 
	 * @param value
	 *            double 待round的数字
	 * @return double round后的数字
	 */
	public static double round5(double value) {
		int multiple = (int) Math.pow(10, DIGIT_DEFAULT_NUM);
		int mutiValue = (int) (NumberUtils.truncate(value, DIGIT_DEFAULT_NUM) * multiple);
		int mod = mutiValue % 10;
		mutiValue -= mod;
		if (mod > 0 && mod < 5) {
			mod = 5;
		} else if (mod > 5) {
			mod = 10;
		}
		return (mutiValue + mod) / (double) multiple;
	}

	/**
	 * Description: 将指定位数上的小数进行round,指定位数后的小数全部截取掉.
	 * round规则:1-5的round为5,6-9的round为0且进位
	 * 
	 * @param value
	 *            double 待round的数字
	 * @param digits
	 *            int 指定的小数位置
	 * @return double round后的数字
	 */
	public static double round5(double value, int digits) {
		int multiple = (int) Math.pow(10, digits);
		int mutiValue = (int) (NumberUtils.truncate(value, digits) * multiple);
		int mod = mutiValue % 10;
		mutiValue -= mod;
		if (mod > 0 && mod < 5) {
			mod = 5;
		} else if (mod > 5) {
			mod = 10;
		}
		return (mutiValue + mod) / (double) multiple;
	}

	/**
	 * Description: 对小数进行向上round(默认保留两位小数),两位小数后的小数全部截取掉.
	 * round规则:指定位数后的小数不全为0的则进位
	 * 
	 * @param value
	 *            double 待round的数字
	 * @return double round后的数字
	 */
	public static double roundUp(double value) {
		if (value == truncate(value, DIGIT_DEFAULT_NUM)) {
			return value;
		} else {
			return (new BigDecimal(toString(truncate(value, DIGIT_DEFAULT_NUM))))
					.add(new BigDecimal(toString(1.0 / Math.pow(10, DIGIT_DEFAULT_NUM)))).doubleValue();
		}
	}

	/**
	 * Description: 将指定位数上的小数进行向上round,指定位数后的小数全部截取掉. round规则:指定位数后的小数不全为0的则进位
	 * 
	 * @param value
	 *            double 待round的数字
	 * @param digits
	 *            int 指定的小数位置
	 * @return double round后的数字
	 */
	public static double roundUp(double value, int digits) {
		if (value == truncate(value, digits)) {
			return value;
		} else {
			return (new BigDecimal(toString(truncate(value, digits))))
					.add(new BigDecimal(toString(1.0 / Math.pow(10, digits)))).doubleValue();
		}
	}

	/**
	 * Description: 该方法处理的过程如下: 1.对小数进行round(默认保留两位小数)
	 * 2.取得到的数字是metavalue的倍数值,并进行进位round 3.进位后的倍数值乘于metavalue,倍数值最小为1
	 * 
	 * @param value
	 *            double 待处理的数字
	 * @param metavalue
	 *            double 数字
	 * @return double 处理后得到的数字
	 */
	public static double roundMultiple(double value, double metavalue) {
		int upMultiple = (int) roundUp(round(value, DIGIT_DEFAULT_NUM) / metavalue, 0);
		return (upMultiple <= 0 ? 1 : upMultiple) * metavalue;
	}

	/**
	 * Description: 该方法处理的过程如下: 1.将指定位数上的小数进行round
	 * 2.取得到的数字是metavalue的倍数值,并进行进位round 3.进位后的倍数值乘于metavalue,倍数值最小为1
	 * 
	 * @param value
	 *            double 待处理的数字
	 * @param digits
	 *            int 保留小数的位数
	 * @param metavalue
	 *            double 数字
	 * @return double 处理后得到的数字
	 */
	public static double roundMultiple(double value, int digits, double metavalue) {
		int upMultiple = (int) roundUp(round(value, digits) / metavalue, 0);
		return (upMultiple <= 0 ? 1 : upMultiple) * metavalue;
	}

	/**
	 * Description: 默认保留两位小数的截取方法
	 * 
	 * @param amount
	 *            double 待truncate的数字
	 * @return double truncate后的数字
	 */
	public static double truncate(double amount) {
		return truncate(amount, DIGIT_DEFAULT_NUM);
	}

	/**
	 * Description: 保留指定小数位数的截取方法
	 * 
	 * @param amount
	 *            double 待truncate的数字
	 * @param digits
	 *            int 保留小数的位数
	 * @return double truncate后的数字
	 */
	public static double truncate(double amount, int digits) {
		return getDouble(amount, digits, true);
	}

	/**
	 * Description: 默认保留两位小数的截取方法
	 * 
	 * @param amount
	 *            BigDecimal 待truncate的数字
	 * @return BigDecimal truncate后的数字
	 */
	public static BigDecimal truncate(BigDecimal amount) {
		return truncate(amount, DIGIT_DEFAULT_NUM);
	}

	/**
	 * Description: 保留指定小数位数的截取方法
	 * 
	 * @param amount
	 *            BigDecimal 待truncate的数字
	 * @param digits
	 *            int 保留小数的位数
	 * @return BigDecimal truncate后的数字
	 */
	public static BigDecimal truncate(BigDecimal amount, int digits) {
		BigDecimal one = new BigDecimal("1");
		return amount.divide(one, digits, BigDecimal.ROUND_DOWN);
	}

	/**
	 * Description: 默认保留两位小数的截取方法
	 * 
	 * @param amount
	 *            String 待truncate的数字
	 * @return BigDecimal truncate后的数字
	 */
	public static BigDecimal truncate(String amount) {
		return truncate(amount, DIGIT_DEFAULT_NUM);
	}

	/**
	 * Description: 保留指定小数位数的截取方法
	 * 
	 * @param amount
	 *            String 待truncate的数字
	 * @param digits
	 *            int 保留小数的位数
	 * @return BigDecimal truncate后的数字
	 */
	public static BigDecimal truncate(String amount, int digits) {
		return truncate(new BigDecimal(amount), digits);
	}

	/**
	 * Description: 保留指定小数位数的四舍五入后,判断该数字是否为0
	 * 
	 * @param value
	 *            double 数字
	 * @param digits
	 *            int 保留小数的位数
	 * @return boolean 如果为0则返回true,否则返回false
	 */
	public static boolean isZero(double value, int digits) {
		return round(value, digits) == 0;
	}

	/**
	 * Description: 判断字符串是否为数字
	 * 
	 * @param str
	 *            String 字符串
	 * @return boolean 如果为数字则返回true,否则返回false
	 */
	public static boolean isNumber(String str) {
		boolean flag = true;
		if (str == null || str.length() <= 0)
			flag = false;
		int i = str.length();
		for (int j = 0; j < i && flag; j++)
			if (!isNumber(str.charAt(j)))
				flag = false;

		return flag;
	}

	/**
	 * Description: 判断char是否为数字
	 * 
	 * @param c
	 *            char 字节
	 * @return boolean 如果为数字则返回true,否则返回false
	 */
	public static boolean isNumber(char c) {
		boolean flag = false;
		if (c == '0' || c == '1' || c == '2' || c == '3' || c == '4' || c == '5' || c == '6' || c == '7' || c == '8'
				|| c == '9')
			flag = true;
		return flag;
	}

	/**
	 * Description: 取得三个long数字中的最小值
	 * 
	 * @param a
	 *            long
	 * @param b
	 *            long
	 * @param c
	 *            long
	 * @return long 最小的long数字
	 */
	public static long minimum(long a, long b, long c) {
		return org.apache.commons.lang3.math.NumberUtils.min(a, b, c);
	}

	/**
	 * Description: 取得三个int数字中的最小值
	 * 
	 * @param a
	 *            int
	 * @param b
	 *            int
	 * @param c
	 *            int
	 * @return int 最小的int数字
	 */
	public static int minimum(int a, int b, int c) {
		return org.apache.commons.lang3.math.NumberUtils.min(a, b, c);
	}

	/**
	 * Description: 取得三个double数字中的最小值
	 * 
	 * @param a
	 *            double
	 * @param b
	 *            double
	 * @param c
	 *            double
	 * @return double 最小的double数字
	 */
	public static double minimum(double a, double b, double c) {
		return (a < b ? a : b) < c ? (a < b ? a : b) : c;
	}

	/**
	 * Description: 取得三个float数字中的最小值
	 * 
	 * @param a
	 *            float
	 * @param b
	 *            float
	 * @param c
	 *            float
	 * @return floa 最小的float数字
	 */
	public static float minimum(float a, float b, float c) {
		return (a < b ? a : b) < c ? (a < b ? a : b) : c;
	}

	/**
	 * Description: 取得三个long数字中的最大值
	 * 
	 * @param a
	 *            long
	 * @param b
	 *            long
	 * @param c
	 *            long
	 * @return long 最大的long数字
	 */
	public static long maximum(long a, long b, long c) {
		return org.apache.commons.lang3.math.NumberUtils.max(a, b, c);
	}

	/**
	 * Description: 取得三个int数字中的最大值
	 * 
	 * @param a
	 *            int
	 * @param b
	 *            int
	 * @param c
	 *            int
	 * @return int 最大的int数字
	 */
	public static int maximum(int a, int b, int c) {
		return org.apache.commons.lang3.math.NumberUtils.max(a, b, c);
	}

	/**
	 * Description: 取得三个double数字中的最大值
	 * 
	 * @param a
	 *            double
	 * @param b
	 *            double
	 * @param c
	 *            double
	 * @return double 最大的double数字
	 */
	public static double maximum(double a, double b, double c) {
		return (a > b ? a : b) > c ? (a > b ? a : b) : c;
	}

	/**
	 * Description: 取得三个float数字中的最大值
	 * 
	 * @param a
	 *            float
	 * @param b
	 *            float
	 * @param c
	 *            float
	 * @return float 最大的float数字
	 */
	public static float maximum(float a, float b, float c) {
		return (a > b ? a : b) > c ? (a > b ? a : b) : c;
	}

	/**
	 * Description: 取得long数字数组中的最小值
	 * 
	 * @param longArray
	 *            long[] long数字数组
	 * @return long 最小的long数字
	 */
	public static long minimum(long[] longArray) {
		long min = Long.MAX_VALUE;
		for (int i = 0; i < longArray.length; i++) {
			if (longArray[i] < min) {
				min = longArray[i];
			}
		}
		return min;
	}

	/**
	 * Description: 取得int数字数组中的最小值
	 * 
	 * @param intArray
	 *            int[] int数字数组
	 * @return int 最小的int数字
	 */
	public static int minimum(int[] intArray) {
		int min = Integer.MAX_VALUE;
		for (int i = 0; i < intArray.length; i++) {
			if (intArray[i] < min) {
				min = intArray[i];
			}
		}
		return min;
	}

	/**
	 * Description: 取得double数字数组中的最小值
	 * 
	 * @param doubleArray
	 *            double[] double数字数组
	 * @return double 最小的double数字
	 */
	public static double minimum(double[] doubleArray) {
		double min = Double.POSITIVE_INFINITY;
		for (int i = 0; i < doubleArray.length; i++) {
			if (doubleArray[i] < min) {
				min = doubleArray[i];
			}
		}
		return min;
	}

	/**
	 * Description: 取得float数字数组中的最小值
	 * 
	 * @param floatArray
	 *            float[] float数字数组
	 * @return float 最小的float数字
	 */
	public static float minimum(float[] floatArray) {
		float min = Float.POSITIVE_INFINITY;
		for (int i = 0; i < floatArray.length; i++) {
			if (floatArray[i] < min) {
				min = floatArray[i];
			}
		}
		return min;
	}

	/**
	 * Description: 取得long数字数组中的最大值
	 * 
	 * @param longArray
	 *            long[] long数字数组
	 * @return long 最大的long数字
	 */
	public static long maximum(long[] longArray) {
		long max = Long.MIN_VALUE;
		for (int i = 0; i < longArray.length; i++) {
			if (longArray[i] > max) {
				max = longArray[i];
			}
		}
		return max;
	}

	/**
	 * Description: 取得int数字数组中的最大值
	 * 
	 * @param intArray
	 *            int[] int数字数组
	 * @return int 最大的int数字
	 */
	public static int maximum(int[] intArray) {
		int max = Integer.MIN_VALUE;
		for (int i = 0; i < intArray.length; i++) {
			if (intArray[i] > max) {
				max = intArray[i];
			}
		}
		return max;
	}

	/**
	 * Description: 取得double数字数组中的最大值
	 * 
	 * @param doubleArray
	 *            double[] double数字数组
	 * @return double 最大的double数字
	 */
	public static double maximum(double[] doubleArray) {
		double max = Double.NEGATIVE_INFINITY;
		for (int i = 0; i < doubleArray.length; i++) {
			if (doubleArray[i] > max) {
				max = doubleArray[i];
			}
		}
		return max;
	}

	/**
	 * Description: 取得float数字数组中的最大值
	 * 
	 * @param floatArray
	 *            float[] float数字数组
	 * @return float 最大的float数字
	 */
	public static float maximum(float[] floatArray) {
		float max = Float.NEGATIVE_INFINITY;
		for (int i = 0; i < floatArray.length; i++) {
			if (floatArray[i] > max) {
				max = floatArray[i];
			}
		}
		return max;
	}

	/**
	 * Description: 按照指定格式格式化BigDecimal
	 * 
	 * @param value
	 *            BigDecimal 待格式化的BigDecimal
	 * @param format
	 *            String 指定格式
	 * @return String 格式化后的数字
	 * @throws Exception
	 */
	public static String format(BigDecimal value, String format) throws Exception {
		String display = null;
		if (value != null) {
			display = String.valueOf(value);
			format = format != null ? format : DECIMAL_DEFAULT_FORMAT;
			DecimalFormat df = new DecimalFormat(format);
			display = df.format(value);
		}
		return display;
	}

	/**
	 * Description: 按照默认格式格式化BigDecimal
	 * 
	 * @param value
	 *            BigDecimal 待格式化的BigDecimal
	 * @return String 格式化后的数字
	 * @throws Exception
	 */
	public static String format(BigDecimal value) throws Exception {
		return format(value, null);
	}

	/**
	 * Description: 按照指定格式格式化double
	 * 
	 * @param value
	 *            double 待格式化的double
	 * @param format
	 *            String 指定格式
	 * @return String 格式化后的数字
	 * @throws Exception
	 */
	public static String format(double value, String format) throws Exception {
		return format(new BigDecimal(value), format);
	}

	/**
	 * Description: 按照默认格式格式化double
	 * 
	 * @param value
	 *            double 待格式化的double
	 * @return String 格式化后的数字
	 * @throws Exception
	 */
	public static String format(double value) throws Exception {
		return format(new BigDecimal(value));
	}

	/**
	 * Description: 按照指定格式格式化long
	 * 
	 * @param value
	 *            long 待格式化的long
	 * @param format
	 *            String 指定格式
	 * @return String 格式化后的数字
	 * @throws Exception
	 */
	public static String format(long value, String format) throws Exception {
		return format(new BigDecimal(value), format);
	}

	/**
	 * Description: 按照默认格式格式化long
	 * 
	 * @param value
	 *            long 待格式化的long
	 * @return String 格式化后的数字
	 * @throws Exception
	 */
	public static String format(long value) throws Exception {
		return format(new BigDecimal(value));
	}

	/**
	 * Description: 按照百分数格式化BigDecimal
	 * 
	 * @param value
	 *            BigDecimal 待格式化的BigDecimal
	 * @return String 格式化后的数字
	 * @throws Exception
	 */
	public static String formatPercent(BigDecimal value) throws Exception {
		return format(value, "##0.##%");
	}

	/**
	 * Description: 按照百分数格式化double
	 * 
	 * @param value
	 *            double 待格式化的double
	 * @return String 格式化后的数字
	 * @throws Exception
	 */
	public static String formatPercent(double value) throws Exception {
		return format((new BigDecimal(value)).multiply(new BigDecimal(100D)), "##0.##");
	}
}