package com.six.core.service;

import java.util.List;

import com.six.core.config.Area;
import com.six.core.config.Combox;
import com.six.core.config.DaysDtl;
import com.six.core.config.Lov;

public class LabelManager
{
  public static void init()
  {
    LabelCache.getInstance().init();
  }

  public static List<Combox> getComboxLabel(String code)
  {
    return LabelCache.getInstance().getComboxLabel(code, "CN");
  }

  public static List<Combox> getComboxLabel(String code, String languageType) {
    return LabelCache.getInstance().getComboxLabel(code, languageType);
  }

  public static void setComboxLabel(String code, List<Combox> list) {
    LabelCache.getInstance().setComboxLabel(code, list);
  }

  public static List<Area> getAreaLabel(String areaCode) {
    return LabelCache.getInstance().getArea(areaCode);
  }
  
  public static Area getCurrentArea(String areaCode) {
	    return LabelCache.getInstance().getCurrentArea(areaCode);
	  }

  public static Lov getLov(String lovCode) {
    return LabelCache.getInstance().getLov(lovCode);
  }

	public static List<DaysDtl> getHolidayList() {
    return LabelCache.getInstance().getHolidayList();
  }
}