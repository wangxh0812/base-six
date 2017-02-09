package com.six.core.utils;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Locale;
import java.util.TimeZone;

import org.apache.commons.lang3.StringUtils;

import com.six.core.config.DaysDtl;
import com.six.core.service.LabelManager;

public class DateUtils {
	private static final SimpleDateFormat datetimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

	private static final SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");

	private static final SimpleDateFormat cf = new SimpleDateFormat("yyyyMMddHHmm");

	private static final SimpleDateFormat dt = new SimpleDateFormat("yyyyMMdd HH:mm:ss");

	private static final SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");
	static final long daytimes = 86400000L;
	private static Calendar c = new GregorianCalendar();

	public static int DAYS_OF_MONTH = 31;

	public static String currentTime() {
		return timeFormat.format(today());
	}

	public static String currentDatetime() {
		return datetimeFormat.format(today());
	}

	public static String currentDate() {
		return dateFormat.format(today());
	}

	public static Date today() {
		return new Date();
	}

	public static Date todayFormat() {
		try {
			return parseDate(currentDate());
		} catch (ParseException e) {
		}
		return new Date();
	}

	public static Date yesterday() {
		Calendar cal = Calendar.getInstance();
		cal.add(5, -1);
		return cal.getTime();
	}

	public static String yesterdayStr() {
		return dateFormat.format(yesterday());
	}

	public static String formatTime(Date date) {
		return timeFormat.format(date);
	}

	public static String formatDate(Date date) {
		return dateFormat.format(date);
	}

	public static String df(Date date) {
		return df.format(date);
	}

	public static String cf(Date date) {
		return cf.format(date);
	}

	public static String dt(Date date) {
		return dt.format(date);
	}

	public static String formatDatetime(Date date) {
		return datetimeFormat.format(date);
	}

	public static String formatDatetime(Date date, String pattern) {
		SimpleDateFormat customFormat = (SimpleDateFormat) datetimeFormat.clone();
		customFormat.applyPattern(pattern);
		return customFormat.format(date);
	}

	public static Calendar calendar() {
		Calendar cal = GregorianCalendar.getInstance(Locale.CHINESE);
		cal.setFirstDayOfWeek(2);
		return cal;
	}

	public static long millis() {
		return System.currentTimeMillis();
	}

	public static int year() {
		return calendar().get(1);
	}

	public static int month() {
		return calendar().get(2) + 1;
	}

	public static int dayOfMonth() {
		return calendar().get(5);
	}

	public static int dayOfWeek() {
		return calendar().get(7);
	}

	public static int dayOfYear() {
		return calendar().get(6);
	}

	public static boolean isBefore(Date src, Date dst) {
		return src.before(dst);
	}

	public static boolean isAfter(Date src, Date dst) {
		return src.after(dst);
	}

	public static boolean isEqual(Date date1, Date date2) {
		return date1.compareTo(date2) == 0;
	}

	public static boolean between(Date beginDate, Date endDate, Date src) {
		return (beginDate.getTime() == src.getTime()) || (endDate.getTime() == src.getTime())
				|| ((beginDate.before(src)) && (endDate.after(src)));
	}

	public static Date lastDayOfMonth() {
		Calendar cal = calendar();
		cal.set(5, 0);
		cal.set(11, 0);
		cal.set(12, 0);
		cal.set(13, 0);
		cal.set(14, 0);
		cal.set(2, cal.get(2) + 1);
		cal.set(14, -1);
		return cal.getTime();
	}

	public static Date firstDayOfMonth() {
		Calendar cal = calendar();
		cal.set(5, 1);
		cal.set(11, 0);
		cal.set(12, 0);
		cal.set(13, 0);
		cal.set(14, 0);
		return cal.getTime();
	}

	public static Date weekDay(int week) {
		Calendar cal = calendar();
		cal.set(7, week);
		return cal.getTime();
	}

	public static Date friday() {
		return weekDay(6);
	}

	public static Date saturday() {
		return weekDay(7);
	}

	public static Date sunday() {
		return weekDay(1);
	}

	public static Date parseDatetime(String datetime) throws ParseException {
		return datetimeFormat.parse(datetime);
	}

	public static Date parseDate(String date) throws ParseException {
		return dateFormat.parse(date);
	}

	public static Date parseTime(String time) throws ParseException {
		return timeFormat.parse(time);
	}

	public static Date parseDatetime(String datetime, String pattern) throws ParseException {
		SimpleDateFormat format = (SimpleDateFormat) datetimeFormat.clone();
		format.applyPattern(pattern);
		return format.parse(datetime);
	}

	public static String dateToString(Date date, String format) {
		SimpleDateFormat simpledateformat = new SimpleDateFormat(format);
		if (date != null) {
			return simpledateformat.format(date);
		}
		return "";
	}

	public static Date stringToDate(String str, String format) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		sdf.setLenient(Boolean.FALSE.booleanValue());
		Date date = sdf.parse(str);
		return date;
	}

	public static int getWeekOfDate(Date date) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd|w");
		String fmt = sdf.format(date);
		return new Integer(StringUtils.substringAfter(fmt, "|")).intValue();
	}

	public static boolean isValidDate(String str, String format) {
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		sdf.setLenient(Boolean.FALSE.booleanValue());
		try {
			sdf.parse(str);
			return Boolean.TRUE.booleanValue();
		} catch (ParseException e) {
		}
		return Boolean.FALSE.booleanValue();
	}

	public static Date getCalcDay(Date date, int day) {
		Calendar c = Calendar.getInstance();
		if (date == null) {
			date = new Date();
		}
		c.setTime(date);
		c.add(5, day);
		return c.getTime();
	}

	public static Date getBeforeDay(int day) throws ParseException {
		Calendar c = Calendar.getInstance();
		Date date = dateFormat.parse(currentDate());
		c.setTime(date);
		c.add(5, -day);
		return c.getTime();
	}

	public static Date getBeforeMonth(int month) throws ParseException {
		Calendar c = Calendar.getInstance();
		Date date = dateFormat.parse(currentDate());
		c.setTime(date);
		c.add(2, month);
		return c.getTime();
	}

	public static Date addMonths(Date date, int amount) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.add(2, amount);
		return c.getTime();
	}

	public static Date timeToDate(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.set(11, 0);
		c.set(12, 0);
		c.set(13, 0);
		return c.getTime();
	}

	public static Date addDay(int amount) {
		Calendar c = Calendar.getInstance();
		c.setTime(today());
		c.add(5, amount);
		return c.getTime();
	}

	public static Date addHour(int hour) {
		Calendar c = Calendar.getInstance();
		c.setTime(today());
		c.add(11, hour);
		return c.getTime();
	}

	public static Date addDay(Date date, int calendarField, int amount) {
		c.setTime(date);
		c.add(calendarField, amount);
		return c.getTime();
	}

	public static String getDateSubtract(Date date1, Date date2) throws ParseException {
		long d1 = date1.getTime();
		long d2 = date2.getTime();
		Date now = datetimeFormat.parse(formatDatetime(date1));
		Date date = datetimeFormat.parse(formatDatetime(date2));
		long l = 0L;
		if (d1 > d2) {
			l = now.getTime() - date.getTime();
		} else {
			l = date.getTime() - now.getTime();
		}
		long day = l / 86400000L;
		long hour = l / 3600000L - day * 24L;
		long min = l / 60000L - day * 24L * 60L - hour * 60L;
		long s = l / 1000L - day * 24L * 60L * 60L - hour * 60L * 60L - min * 60L;
		String dayday = day + "天" + hour + "小时" + min + "分" + s + "秒";
		return dayday;
	}

	public static long getDateSubDays(Date date1, Date date2) {
		long d1 = date1.getTime();
		long d2 = date2.getTime();
		long diff = 0L;
		if (d1 == d2)
			return diff;
		if (d1 > d2)
			diff = d1 - d2;
		else {
			diff = d2 - d1;
		}
		return diff / 86400000L;
	}

	public static int getDateSubMonths(Date date1, Date date2) {
		int result = 0;
		Calendar c1 = Calendar.getInstance();
		Calendar c2 = Calendar.getInstance();
		if (date2.after(date1)) {
			c1.setTime(date1);
			c2.setTime(date2);
		} else {
			c1.setTime(date2);
			c2.setTime(date1);
		}
		result = (c2.get(1) - c1.get(1)) * 12 + (c2.get(2) - c1.get(2));
		return result == 0 ? 1 : Math.abs(result);
	}

	public static int getDateSubDaysForWork(Date start, Date end) {
		Date temp = start;
		if (temp.after(end)) {
			temp = end;
			end = start;
		}
		int days = -1;
		Calendar sdate = Calendar.getInstance();
		while (start.compareTo(end) <= 0) {
			sdate.setTime(start);
			if ((sdate.get(7) != 1) && (sdate.get(7) != 7)) {
				days++;
			}
			start = addDay(start, 1);
		}
		days -= subtracHoliday(temp, end);
		return days < 0 ? 0 : days;
	}

	public static int subtracHoliday(Date start, Date end) {
		List<DaysDtl> list = LabelManager.getHolidayList();
		int hdays = 0;
		for (DaysDtl dtl : list) {
			if ((!dtl.getDayValue().before(start)) && (!dtl.getDayValue().after(end))) {
				if (dtl.isWork())
					hdays--;
				else
					hdays++;
			}
		}
		return hdays;
	}

	public static Date getDateByFormat(Date sourceDate, String format) throws ParseException {
		SimpleDateFormat f = new SimpleDateFormat(format);
		String dateString = f.format(sourceDate);
		Date date = f.parse(dateString);
		return date;
	}

	public static Date getDateByFormat(String sourceDateStr, String format) throws ParseException {
		SimpleDateFormat f = new SimpleDateFormat(format);
		Date date = f.parse(sourceDateStr);
		return date;
	}

	public static boolean isTimeOut(Date startDate, long intervalTime) {
		boolean ret = false;
		Date currentDate = new Date();
		long minuteDif = currentDate.getTime() - startDate.getTime();
		if (minuteDif >= intervalTime) {
			ret = true;
		}
		return ret;
	}

	public static boolean isRepaymentTime() throws Exception {
		boolean ret = false;
		Date currentDate = new Date();
		String startDateStr = dateFormat.format(currentDate).concat(" 04:00:00");
		String ednDateStr = dateFormat.format(currentDate).concat(" 23:30:00");
		Date startDate = datetimeFormat.parse(startDateStr);
		Date endDate = datetimeFormat.parse(ednDateStr);
		if ((currentDate.getTime() > startDate.getTime()) && (currentDate.getTime() < endDate.getTime())) {
			ret = true;
		}
		return ret;
	}

	public static boolean isIllegalDate(String sourceStr) {
		boolean ret = false;
		if ((!CommonUtil.isBlank(sourceStr)) && (!CommonUtil.isEmpty(sourceStr))) {
			try {
				Date date = dateFormat.parse(sourceStr);
				if (date != null)
					return Boolean.TRUE.booleanValue();
			} catch (ParseException e) {
				return Boolean.FALSE.booleanValue();
			}
		}
		return ret;
	}

	public static Date getMondayByDate(Date date) {
		Calendar c = calendar();
		c.setTime(date);
		c.add(5, -(getNumByDate(date) - 1));
		return c.getTime();
	}

	public static Date getSundayByDate(Date date) {
		Calendar c = calendar();
		c.setTime(date);
		c.add(5, 7 - getNumByDate(date));
		return c.getTime();
	}

	public static int getNumByDate(Date date) {
		Calendar c = calendar();
		c.setTime(date);
		int i = c.get(7) - 1;
		return i != 0 ? i : 7;
	}

	/**
	 * Description: 获取日期中的年份
	 * 
	 * @param date
	 *            java.util.Date 日期
	 * @return int 日期中的年份
	 */
	public static int getYear(java.util.Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return calendar.get(Calendar.YEAR);
	}

	/**
	 * Description: 获取日期中的年份
	 * 
	 * @param date
	 *            long 日期
	 * @return int 日期中的年份
	 */
	public static int getYear(long date) {
		return getYear(new java.util.Date(date));
	}

	/**
	 * Description: 获取日期中的月份
	 * 
	 * @param date
	 *            java.util.Date 日期
	 * @return int 日期中的月份
	 */
	public static int getMonth(java.util.Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return calendar.get(Calendar.MONTH) + 1;
	}

	/**
	 * Description: 获取日期中的月份
	 * 
	 * @param date
	 *            long 日期
	 * @return int 日期中的月份
	 */
	public static int getMonth(long date) {
		return getMonth(new java.util.Date(date));
	}

	/**
	 * Description: 获取日期中的日
	 * 
	 * @param date
	 *            java.util.Date 日期
	 * @return int 日期中的日
	 */
	public static int getDay(java.util.Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return calendar.get(Calendar.DAY_OF_MONTH);
	}

	/**
	 * Description: 获取日期中的日
	 * 
	 * @param date
	 *            long 日期
	 * @return int 日期中的日
	 */
	public static int getDay(long date) {
		return getDay(new java.util.Date(date));
	}

	/**
	 * Description: 获取日期中的时
	 * 
	 * @param date
	 *            java.util.Date 日期
	 * @return int 日期中的时
	 */
	public static int getHour(java.util.Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return calendar.get(Calendar.HOUR_OF_DAY);
	}

	/**
	 * Description: 获取日期中的时
	 * 
	 * @param date
	 *            long 日期
	 * @return int 日期中的时
	 */
	public static int getHour(long date) {
		return getHour(new java.util.Date(date));
	}

	/**
	 * Description: 获取日期中的分
	 * 
	 * @param date
	 *            java.util.Date 日期
	 * @return int 日期中的分
	 */
	public static int getMinute(java.util.Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return calendar.get(Calendar.MINUTE);
	}

	/**
	 * Description: 获取日期中的分
	 * 
	 * @param date
	 *            long 日期
	 * @return int 日期中的分
	 */
	public static int getMinute(long date) {
		return getMinute(new java.util.Date(date));
	}

	/**
	 * Description: 获取日期中的秒
	 * 
	 * @param date
	 *            java.util.Date 日期
	 * @return int 日期中的秒
	 */
	public static int getSecond(java.util.Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return calendar.get(Calendar.SECOND);
	}

	/**
	 * Description: 获取日期中的秒
	 * 
	 * @param date
	 *            long 日期
	 * @return int 日期中的秒
	 */
	public static int getSecond(long date) {
		return getSecond(new java.util.Date(date));
	}

	/**
	 * Description: 获取日期中的年份的后2位数字
	 * 
	 * @param date
	 *            java.util.Date 日期
	 * @return String 日期中的年份的后2位数字
	 */
	public static String getShortYear(java.util.Date date) {
		String year = getYear(date) + "";
		int length = year.length();
		return year.substring(length - 2, length);
	}

	/**
	 * Description: 获取日期中的年份的后2位数字
	 * 
	 * @param date
	 *            long 日期
	 * @return String 日期中的年份的后2位数字
	 */
	public static String getShortYear(long date) {
		return getShortYear(new java.util.Date(date));
	}

	/**
	 * Description: 给日期增加年数
	 * 
	 * @param oldDate
	 *            java.util.Date 日期
	 * @param addYears
	 *            int 增加的年数
	 * @return java.util.Date 增加年数后的日期
	 */
	public static java.util.Date addYear(java.util.Date oldDate, int addYears) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(oldDate);
		calendar.add(Calendar.YEAR, addYears);
		return calendar.getTime();
	}

	/**
	 * Description: 给时间增加年数
	 * 
	 * @param oldDate
	 *            Timestamp 时间
	 * @param addYears
	 *            int 增加的年数
	 * @return Timestamp 增加年数后的时间
	 */
	public static Timestamp addYear(Timestamp oldDate, int addYears) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new java.util.Date(oldDate.getTime()));
		calendar.add(calendar.YEAR, addYears);
		return new Timestamp(calendar.getTime().getTime());
	}

	/**
	 * Description: 给日期增加月数
	 * 
	 * @param oldDate
	 *            java.util.Date 日期
	 * @param addMonths
	 *            int 增加的月数
	 * @return java.util.Date 增加月数后的日期
	 */
	public static java.util.Date addMonth(java.util.Date oldDate, int addMonths) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(oldDate);
		calendar.add(Calendar.MONTH, addMonths);
		return calendar.getTime();
	}

	/**
	 * Description: 给时间增加月数
	 * 
	 * @param oldDate
	 *            Timestamp 时间
	 * @param addMonths
	 *            int 增加的月数
	 * @return Timestamp 增加月数后的时间
	 */
	public static Timestamp addMonth(Timestamp oldDate, int addMonths) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new java.util.Date(oldDate.getTime()));
		calendar.add(calendar.MONTH, addMonths);
		return new Timestamp(calendar.getTime().getTime());
	}

	/**
	 * Description: 给日期增加周数
	 * 
	 * @param oldDate
	 *            java.util.Date 日期
	 * @param addWeeks
	 *            int 增加的周数
	 * @return java.util.Date 增加周数后的日期
	 */
	public static java.util.Date addWeek(java.util.Date oldDate, int addWeeks) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(oldDate);
		calendar.add(Calendar.WEEK_OF_YEAR, addWeeks);
		return calendar.getTime();
	}

	/**
	 * Description: 给时间增加周数
	 * 
	 * @param oldDate
	 *            Timestamp 时间
	 * @param addWeeks
	 *            int 增加的周数
	 * @return Timestamp 增加周数后的时间
	 */
	public static Timestamp addWeek(Timestamp oldDate, int addWeeks) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new java.util.Date(oldDate.getTime()));
		calendar.add(calendar.WEEK_OF_YEAR, addWeeks);
		return new Timestamp(calendar.getTime().getTime());
	}

	/**
	 * Description: 给日期增加天数
	 * 
	 * @param oldDate
	 *            java.util.Date 日期
	 * @param addDays
	 *            int 增加的天数
	 * @return java.util.Date 增加天数后的日期
	 */
	public static java.util.Date addDay(java.util.Date oldDate, int addDays) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(oldDate);
		calendar.add(Calendar.DATE, addDays);
		return calendar.getTime();
	}

	/**
	 * Description: 给时间增加天数
	 * 
	 * @param oldDate
	 *            Timestamp 时间
	 * @param addDays
	 *            int 增加的天数
	 * @return Timestamp 增加天数后的时间
	 */
	public static Timestamp addDay(Timestamp oldDate, int addDays) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new java.util.Date(oldDate.getTime()));
		calendar.add(calendar.DATE, addDays);
		return new Timestamp(calendar.getTime().getTime());
	}

	/**
	 * Description: 给日期增加时数
	 * 
	 * @param oldDate
	 *            java.util.Date 日期
	 * @param addHours
	 *            int 增加的时数
	 * @return java.util.Date 增加时数后的日期
	 */
	public static java.util.Date addHour(java.util.Date oldDate, int addHours) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(oldDate);
		calendar.add(Calendar.HOUR, addHours);
		return calendar.getTime();
	}

	/**
	 * Description: 给时间增加时数
	 * 
	 * @param oldDate
	 *            Timestamp 时间
	 * @param addHours
	 *            int 增加的时数
	 * @return Timestamp 增加时数后的时间
	 */
	public static Timestamp addHour(Timestamp oldDate, int addHours) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new java.util.Date(oldDate.getTime()));
		calendar.add(calendar.HOUR, addHours);
		return new Timestamp(calendar.getTime().getTime());
	}

	/**
	 * Description: 给日期增加分数
	 * 
	 * @param oldDate
	 *            java.util.Date 日期
	 * @param addMinutes
	 *            int 增加的分数
	 * @return java.util.Date 增加分数后的日期
	 */
	public static java.util.Date addMinute(java.util.Date oldDate, int addMinutes) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(oldDate);
		calendar.add(Calendar.MINUTE, addMinutes);
		return calendar.getTime();
	}

	/**
	 * Description: 给时间增加分数
	 * 
	 * @param oldDate
	 *            Timestamp 时间
	 * @param addMinutes
	 *            int 增加的分数
	 * @return Timestamp 增加分数后的时间
	 */
	public static Timestamp addMinute(Timestamp oldDate, int addMinutes) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new java.util.Date(oldDate.getTime()));
		calendar.add(calendar.MINUTE, addMinutes);
		return new Timestamp(calendar.getTime().getTime());
	}

	/**
	 * Description: 给日期增加秒数
	 * 
	 * @param oldDate
	 *            java.util.Date 日期
	 * @param addSeconds
	 *            int 增加的秒数
	 * @return java.util.Date 增加秒数后的日期
	 */
	public static java.util.Date addSecond(java.util.Date oldDate, int addSeconds) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(oldDate);
		calendar.add(Calendar.SECOND, addSeconds);
		return calendar.getTime();
	}

	/**
	 * Description: 给时间增加秒数
	 * 
	 * @param oldDate
	 *            Timestamp 时间
	 * @param addSeconds
	 *            int 增加的秒数
	 * @return Timestamp 增加秒数后的时间
	 */
	public static Timestamp addSecond(Timestamp oldDate, int addSeconds) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new java.util.Date(oldDate.getTime()));
		calendar.add(calendar.SECOND, addSeconds);
		return new Timestamp(calendar.getTime().getTime());
	}

	/**
	 * Description: 日期的年份取整
	 * 
	 * <p>
	 * 规则: 1.月份的进位可导致年份的进位,月份和日为01月01日 2.超过07月01日变升为后一年的01月01日，否则为本年的01月01日
	 * </p>
	 * 
	 * @param date
	 *            java.util.Date 日期
	 * @return java.util.Date 取整后的日期
	 */
	public static java.util.Date roundYear(java.util.Date date) {
		return org.apache.commons.lang3.time.DateUtils.round(date, Calendar.YEAR);
	}

	/**
	 * Description: 日期的月份取整
	 * 
	 * <p>
	 * 规则: 1.日的进位可导致月份进位，月份进位可导致年份进位,日为01日 2.本月为28天，则日超过或等于15，则月份进位.
	 * 3.本月为29天，则日超过或等于16，则月份进位. 4.本月为30天，则日超过或等于16，则月份进位.
	 * 5.本月为31天，则日超过或等于17，则月份进位.
	 * </p>
	 * 
	 * @param date
	 *            java.util.Date 日期
	 * @return java.util.Date 取整后的日期
	 */
	public static java.util.Date roundMonth(java.util.Date date) {
		return org.apache.commons.lang3.time.DateUtils.round(date, Calendar.MONTH);
	}

	/**
	 * Description: 日期的日取整
	 * 
	 * <p>
	 * 规则: 1.时进位会导致日进位,日进位会导致月份进位,月份进位会导致年份进位),时分秒为00:00:00
	 * 2.时分秒超过12:00:00,则日进位,否则为00:00:00
	 * </p>
	 * 
	 * @param date
	 *            java.util.Date 日期
	 * @return java.util.Date 取整后的日期
	 */
	public static java.util.Date roundDay(java.util.Date date) {
		return org.apache.commons.lang3.time.DateUtils.round(date, Calendar.DATE);
	}

	/**
	 * Description: 日期的时取整
	 * 
	 * <p>
	 * 规则: 1.分的进位会导致时进位,时进位会导致日进位,日进位会导致月份进位,月份进位会导致年份进位,分秒为00:00
	 * 2.分秒超过30:00,则时进位,否则为00:00
	 * </p>
	 * 
	 * @param date
	 *            java.util.Date 日期
	 * @return java.util.Date 取整后的日期
	 */
	public static java.util.Date roundHour(java.util.Date date) {
		return org.apache.commons.lang3.time.DateUtils.round(date, Calendar.HOUR);
	}

	/**
	 * Description: 日期的分取整
	 * 
	 * <p>
	 * 规则: 1.秒的进位会导致分的进位,分的进位会导致时进位,时进位会导致日进位,日进位会导致月份进位,月份进位会导致年份进位,秒为00
	 * 2.秒超过30,则分进位,否则为00
	 * </p>
	 * 
	 * @param date
	 *            java.util.Date 日期
	 * @return java.util.Date 取整后的日期
	 */
	public static java.util.Date roundMinute(java.util.Date date) {
		return org.apache.commons.lang3.time.DateUtils.round(date, Calendar.MINUTE);
	}

	/**
	 * Description: 日期的秒取整
	 * 
	 * <p>
	 * 规则:
	 * 1.纳秒的进位会导致分的进位,秒的进位会导致分的进位,分的进位会导致时进位,时进位会导致日进位,日进位会导致月份进位,月份进位会导致年份进位
	 * ,毫秒为000 2.纳秒超过500000000,则秒进位,否则为0
	 * </p>
	 * 
	 * @param date
	 *            java.util.Date 日期
	 * @return java.util.Date 取整后的日期
	 */
	public static java.util.Date roundSencond(java.util.Date date) {
		return org.apache.commons.lang3.time.DateUtils.round(date, Calendar.SECOND);
	}

	/**
	 * Description: 对日期的年份进行截取
	 * 
	 * <p>
	 * 截取规则为:截取后,月日为01月01日,时分秒为00:00:00,纳秒为0
	 * </p>
	 * 
	 * @param date
	 *            java.util.Date 日期
	 * @return java.util.Date 截取后的日期
	 */
	public static java.util.Date truncateYear(java.util.Date date) {
		return org.apache.commons.lang3.time.DateUtils.truncate(date, Calendar.YEAR);
	}

	/**
	 * Description: 对日期的月份进行截取
	 * 
	 * <p>
	 * 截取规则为:截取后,日为01日,时分秒为00:00:00,纳秒为0
	 * </p>
	 * 
	 * @param date
	 *            java.util.Date 日期
	 * @return java.util.Date 截取后的日期
	 */
	public static java.util.Date truncateMonth(java.util.Date date) {
		return org.apache.commons.lang3.time.DateUtils.truncate(date, Calendar.MONTH);
	}

	/**
	 * Description: 对日期的日进行截取
	 * 
	 * <p>
	 * 截取规则为:截取后,时分秒为00:00:00,纳秒为0
	 * </p>
	 * 
	 * @param date
	 *            java.util.Date 日期
	 * @return java.util.Date 截取后的日期
	 */
	public static java.util.Date truncateDay(java.util.Date date) {
		return org.apache.commons.lang3.time.DateUtils.truncate(date, Calendar.DATE);
	}

	/**
	 * Description: 对日期的时进行截取
	 * 
	 * <p>
	 * 截取规则为:截取后,分秒为00:00,纳秒为0
	 * </p>
	 * 
	 * @param date
	 *            java.util.Date 日期
	 * @return java.util.Date 截取后的日期
	 */
	public static java.util.Date truncateHour(java.util.Date date) {
		return org.apache.commons.lang3.time.DateUtils.truncate(date, Calendar.HOUR);
	}

	/**
	 * Description: 对日期的分进行截取
	 * 
	 * <p>
	 * 截取规则为:截取后,秒为0,纳秒为0
	 * </p>
	 * 
	 * @param date
	 *            java.util.Date 日期
	 * @return java.util.Date 截取后的日期
	 */
	public static java.util.Date truncateMinute(java.util.Date date) {
		return org.apache.commons.lang3.time.DateUtils.truncate(date, Calendar.MINUTE);
	}

	/**
	 * Description: 对日期的秒进行截取
	 * 
	 * <p>
	 * 截取规则为:截取后,纳秒为0
	 * </p>
	 * 
	 * @param date
	 *            java.util.Date 日期
	 * @return java.util.Date 截取后的日期
	 */
	public static java.util.Date truncateSecond(java.util.Date date) {
		return org.apache.commons.lang3.time.DateUtils.truncate(date, Calendar.SECOND);
	}

	/**
	 * Description: 将日期格式转换如yyyy-mm-dd格式的String,其格式中的分割符可指定
	 * 
	 * @param division
	 *            String: 指定的分割符
	 * @param date
	 *            java.util.Date 待转换的Date
	 * @return String 转换后的String
	 */
	public static String toString(String division, java.util.Date date) {
		if (date == null) {
			return null;
		}
		if (division == null) {
			division = "";
		}
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		int year = cal.get(Calendar.YEAR);
		int month = cal.get(Calendar.MONTH) + 1;
		int day = cal.get(Calendar.DAY_OF_MONTH);
		String result = "" + year;
		result += division;
		if (month < 10) {
			result += "0";
		}
		result += month;
		result += division;
		if (day < 10) {
			result += "0";
		}
		result += day;
		return result;
	}

	/**
	 * Description: 根据生日计算出给定日期时的年龄
	 * 
	 * 规则： 1. 所得年龄为整数 2. 不限制给定日期一定比生日晚，得出的年龄可以为负数。 3.
	 * 
	 * @param birthday
	 *            java.util.Date 生日
	 * @param endDate
	 *            java.util.Date 给定日期
	 * @return double 年龄
	 */
	public static double getAge(java.util.Date birthday, java.util.Date endDate) {
		double monthAmount = getMonthAmount(birthday, endDate);
		return NumberUtils.roundUp(monthAmount / 12.0);
	}

	/**
	 * Description: 计算两个日期间隔的年数（计算结果可能为小数）
	 * 
	 * @param startDate
	 *            java.util.Date 开始日期
	 * @param endDate
	 *            java.util.Date 结束日期
	 * @return double 两日期间隔的年数
	 */
	public static double getYearAmount(java.util.Date startDate, java.util.Date endDate) {
		return getMonthAmount(startDate, endDate) / 12.0;
	}

	/**
	 * Description: 计算两个日期间隔的月数
	 * 
	 * 计算规则(同SQL中的months_between(date1,date2)方法的逻辑):
	 * 如果两个日期的月份相同或是都是该月的最后一天,则计算所得的间隔月数值为integer,否则结果含小数
	 * 
	 * @param startDate
	 *            java.util.Date 开始日期
	 * @param endDate
	 *            java.util.Date 结束日期
	 * @return int 两日期间隔的月数
	 */
	public static double getMonthAmount(java.util.Date startDate, java.util.Date endDate) {
		int years = 0;
		int nonths = 0;
		double days = 0;
		double monthAmount = 0;
		years = getYear(endDate) - getYear(startDate);
		nonths = getMonth(endDate) - getMonth(startDate);
		if ((getDay(endDate) == getDay(startDate)) || (isMaxDayOfMonth(startDate) && isMaxDayOfMonth(endDate))) {
			days = 0;
		} else {
			days = getDay(endDate) - getDay(startDate);
		}
		monthAmount = years * 12 + nonths + days / DAYS_OF_MONTH;
		return monthAmount;
	}

	/**
	 * Description: 计算两个日期间隔的日数
	 * 
	 * @param startDate
	 *            java.util.Date 开始日期
	 * @param endDate
	 *            java.util.Date 结束日期
	 * @return int 两日期间隔的月数
	 */
	public static int getDayAmount(java.util.Date startDate, java.util.Date endDate) {
		return (int) ((endDate.getTime() - startDate.getTime()) / (double) (1000 * 60 * 60 * 24));
	}

	/**
	 * Description: 判断指定日期是否为该月的最后一天
	 * 
	 * @param date
	 *            java.util.Date 指定日期
	 * @return boolean 如果为该月最后一天,则返回true,否则返回false
	 */
	public static boolean isMaxDayOfMonth(java.util.Date date) {
		return getDay(date) == getMaxDayOfMonth(date);
	}

	/**
	 * Description: 取得指定日期所在月的最后一天
	 * 
	 * @param date
	 *            java.util.Date 指定日期
	 * @return int 所在月的最后一天
	 */
	public static int getMaxDayOfMonth(java.util.Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.getActualMaximum(Calendar.DAY_OF_MONTH);
	}

	/**
	 * Description: 判断指定日期是否为非工作日
	 * 
	 * @param date
	 *            java.util.Date 指定日期
	 * @return boolean 如果为非工作日,则返回true,否则返回false
	 */
	public static boolean isWeekend(java.util.Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		int i = cal.get(Calendar.DAY_OF_WEEK);
		return isWeekend(i);
	}

	/**
	 * Description: 判断指定星期是否为非工作日
	 * 
	 * 判断规则: 1.周六,周日为非工作日,其余为工作日 2.每周是从SUNDAY开始的，以SATURDAY结尾，所以有： SUNDAY=1
	 * MONDAY = 2 TUESDAY = 3 WEDNESDAY = 4 THURSDAY = 5 FRIDAY = 6 SATURDAY = 7
	 * 
	 * @param currDayOfWeek
	 *            String 指定星期
	 * @return boolean 如果为非工作日,则返回true,否则返回false
	 */
	public static boolean isWeekend(int currDayOfWeek) {
		return currDayOfWeek == Calendar.SATURDAY || currDayOfWeek == Calendar.SUNDAY;
	}

	/**
	 * Description: 判断一个字符串是否是有效的日期
	 * 
	 * @param i
	 *            int 年份
	 * @param j
	 *            int 月份
	 * @param k
	 *            int 日
	 * @return boolean 如果是有效日期，则返回true，否则返回false
	 */
	public static boolean isValidDate(int i, int j, int k) {
		boolean flag = false;
		Calendar calendar = java.util.Calendar.getInstance();
		calendar.set(i, j - 1, k);
		if (calendar.get(2) == j - 1)
			flag = true;
		else
			flag = false;
		return flag;
	}

	/**
	 * Description: 按照指定时区格式化指定日期 get the display date string in the specified
	 * time zone
	 * 
	 * 例如:2009[年10月15日 星期四 上午04时34分56秒 GMT]
	 * 
	 * @param date
	 *            java.util.Date
	 * @param locale
	 *            Locale 用户的地理所在地
	 * @param timeZoneStr
	 *            String
	 * @return String
	 */
	public static String formatLocaleDate(java.util.Date date, Locale locale, String timeZoneStr) {
		TimeZone timeZone = TimeZone.getTimeZone(timeZoneStr);
		java.text.DateFormat dateFormatter = java.text.DateFormat.getDateTimeInstance(java.text.DateFormat.FULL,
				java.text.DateFormat.FULL, locale);
		dateFormatter.setTimeZone(timeZone);
		return dateFormatter.format(date);
	}

	// 以下是以前使用的方法，现在不推荐使用//

	public static String fillWithZero(int num) {
		if (num >= 1 && num <= 9) {
			return "0" + num;
		}

		return num + "";
	}

	public static boolean isAdult(Date birthday) {
		long between = DateUtils.getDayAmount(birthday, new Date());
		return (between > 6570.0);
	}

	public static boolean isAdult(Date birthday, Date endDate) {
		int nAge = 0;
		nAge = endDate.getYear() - birthday.getYear();
		if (endDate.getMonth() * 100 + endDate.getDate() < birthday.getMonth() * 100 + birthday.getDate()) {
			nAge--;
		}
		return nAge >= 18;
	}
}