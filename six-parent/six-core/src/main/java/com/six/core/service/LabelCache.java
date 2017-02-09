package com.six.core.service;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;

import com.six.core.config.Area;
import com.six.core.config.Combox;
import com.six.core.config.DaysDtl;
import com.six.core.config.Lov;
import com.six.core.logger.SimpleLogger;
import com.six.core.tree.TreeNode;
import com.six.core.utils.XmlUtils;

public class LabelCache {
	private static Map<String, List<Combox>> comBoxsCn = null;
	private static Map<String, List<Combox>> comBoxsEn = null;
	private static Map<String, List<Combox>> comBoxsTw = null;
	private static List<DaysDtl> holidaysList = new ArrayList();

	private static Map<String, TreeNode> districtMap = new HashMap();

	private static Map<String, Lov> lovMap = null;

	private SimpleLogger logger = SimpleLogger.getLogger(LabelCache.class);

	private final String regex = "^.+\\.(xml)$";

	private String labelfold = "label";
	private String comboxfolder = "comboxlabel";
	private String lovfolder = "lovsetting";
	private String areafolder = "area";
	private String holidayfolder = "holiday";

	private String languageCn = "CN";
	private String languageEn = "EN";
	private String languageTw = "TW";

	public static LabelCache getInstance() {
		return SingletonHolder.instance;
	}

	static class SingletonHolder {
		static LabelCache instance = new LabelCache();
	}

	private LabelCache() {

	}

	public void init() {
		String path = Thread.currentThread().getContextClassLoader().getResource("").getFile();
		if (path.indexOf(":") > 0)
			path = path.substring(path.indexOf("/") + 1, path.length());
		path = path + this.labelfold + File.separator;
		LabelParse labp = new LabelParse();
		String[] comboxfileList = XmlUtils.fileList(path + this.comboxfolder, "^.+\\.(xml)$");
		String[] lovfileList = XmlUtils.fileList(path + this.lovfolder, "^.+\\.(xml)$");
		Document document = null;
		try {
			if ((comboxfileList != null) && (comboxfileList.length != 0)) {
				for (String fileName : comboxfileList) {
					if (this.logger.isDebugEnabled())
						this.logger.debug(" load combox from file " + fileName);
					String lg = XmlUtils.languages(fileName.substring(0, fileName.lastIndexOf(".")));
					document = XmlUtils.getDocument(path + this.comboxfolder + File.separator + fileName);
					if (document != null)
						if (this.languageCn.equals(lg)) {
							comBoxsCn = new HashMap();
							labp.getComboxLabel(document, comBoxsCn);
						} else if (this.languageEn.equals(lg)) {
							comBoxsEn = new HashMap();
							labp.getComboxLabel(document, comBoxsEn);
						} else if (this.languageTw.equals(lg)) {
							comBoxsTw = new HashMap();
							labp.getComboxLabel(document, comBoxsTw);
						}
				}
			} else {
				this.logger.error(" Can not find combox lable file from path:" + path + this.comboxfolder);
			}

			if ((lovfileList != null) && (lovfileList.length != 0)) {
				lovMap = new HashMap();
				for (String fileName : lovfileList) {
					if (this.logger.isDebugEnabled())
						this.logger.debug(" load lov from file " + fileName);
					document = XmlUtils.getDocument(path + this.lovfolder + File.separator + fileName);
					if (document != null)
						labp.getLovLabel(document, lovMap);
				}
			} else {
				this.logger.error(" Can not find lov setting file from path:" + path + this.lovfolder);
			}

			document = XmlUtils.getDocument(path + this.areafolder + File.separator + "areaconfig_list.xml");
			if (this.logger.isDebugEnabled())
				this.logger.debug(" load area from file areaconfig_list.xml");
			if (document != null) {
				labp.getAreaLabel(document, districtMap);
			}

			document = XmlUtils.getDocument(path + this.holidayfolder + File.separator + "holiday_list.xml");
			if (this.logger.isDebugEnabled())
				this.logger.debug(" load holiday from file holiday_list.xml");
			if (document != null)
				labp.getHolidayLabel(document, holidaysList);
		} catch (Exception e) {
			this.logger.error(getClass().getName() + " load label from file Exception", e);
		}
	}

	public Lov getLov(String code) {
		return (Lov) lovMap.get(code);
	}

	public List<DaysDtl> getHolidayList() {
		return holidaysList;
	}

	public List<Area> getArea(String areaCode) {
		List list = null;
		if (districtMap.containsKey(areaCode)) {
			list = new ArrayList();
			TreeNode node = (TreeNode) districtMap.get(areaCode);
			List<TreeNode> sub = node.getList();
			if ((sub == null) || (sub.isEmpty()))
				return list;
			Area area = null;
			for (TreeNode subnode : sub) {
				area = new Area();
				area.setAreaCode(subnode.getId());
				area.setAreaName(subnode.getNodeName());
				list.add(area);
			}
		}
		return list;
	}

	public List<Combox> getComboxLabel(String code, String languageType) {
		if (this.languageCn.equals(languageType)) {
			if (comBoxsCn != null)
				return (List) comBoxsCn.get(code);
		} else if (this.languageEn.equals(languageType)) {
			if (comBoxsEn != null)
				return (List) comBoxsEn.get(code);
		} else if ((this.languageTw.equals(languageType)) && (comBoxsTw != null)) {
			return (List) comBoxsTw.get(code);
		}
		return new ArrayList();
	}

	public void setComboxLabel(String code, List<Combox> list) {
		if ((code == null) || ("".equals(code)))
			return;
		if ((list != null) && (!list.isEmpty()))
			comBoxsCn.put(code, list);
	}

	public void flashComboxCache() {
		comBoxsCn = null;
		comBoxsEn = null;
		comBoxsTw = null;
	}

	public Area getCurrentArea(String areaCode) {
		Area area = new Area();
		area.setAreaCode("");
		area.setAreaName("");
		if (districtMap.containsKey(areaCode)) {
			TreeNode node = (TreeNode) districtMap.get(areaCode);
			area.setAreaCode(node.getId());
			area.setAreaName(node.getNodeName());
		}
		return area;
	}
}