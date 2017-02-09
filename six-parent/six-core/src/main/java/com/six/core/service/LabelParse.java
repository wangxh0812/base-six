package com.six.core.service;

import com.six.core.config.Area;
import com.six.core.config.Combox;
import com.six.core.config.DaysDtl;
import com.six.core.config.Lov;
import com.six.core.logger.SimpleLogger;
import com.six.core.tree.AbstractTreeOperate;
import com.six.core.tree.DepthIterator;
import com.six.core.tree.JcTreeNode;
import com.six.core.tree.TreeNode;
import com.six.core.utils.DateUtils;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.dom4j.Document;
import org.dom4j.Element;

public class LabelParse extends AbstractTreeOperate
{
  private final String[] Node = { "label", "name", "item", "selected" };

  private final String[] aNode = { "area", "code", "name", "parentId" };

  private final String[] hNode = { "holiday", "workday", "days", "name", "value" };

  private SimpleLogger logger = SimpleLogger.getLogger(getClass());

  public void getMsgLabel(Document document, Map<String, String> label) {
    if (label == null)
      return;
    Element root = document.getRootElement();

    for (Iterator it = root.elementIterator(this.Node[0]); it.hasNext(); ) {
      Element element = (Element)it.next();
      String labelName = element.attributeValue(this.Node[1]);
      String labelValue = element.getText();
      label.put(labelName, labelValue);
    }
  }

  public void getHolidayLabel(Document document, List<DaysDtl> label) {
    if (label == null)
      return;
    Element root = document.getRootElement();
    Element holiday = root.element(this.hNode[0]);
    Element workday = root.element(this.hNode[1]);
    DaysDtl dt = null;

    for (Iterator it = holiday.elementIterator(this.hNode[2]); it.hasNext(); ) {
      dt = new DaysDtl();
      Element element = (Element)it.next();
      String name = element.attributeValue(this.hNode[3]);
      String value = element.attributeValue(this.hNode[4]);
      dt.setName(name);
      dt.setWork(Boolean.FALSE.booleanValue());
      try {
        dt.setDayValue(DateUtils.parseDate(value));
      } catch (ParseException e) {
        this.logger.error(" getHolidayLabel ParseException", e);
        continue;
      }
      label.add(dt);
    }

    for (Iterator it = workday.elementIterator(this.hNode[2]); it.hasNext(); ) {
      dt = new DaysDtl();
      Element element = (Element)it.next();
      String name = element.attributeValue(this.hNode[3]);
      String value = element.attributeValue(this.hNode[4]);
      dt.setName(name);
      dt.setWork(Boolean.TRUE.booleanValue());
      try {
        dt.setDayValue(DateUtils.parseDate(value));
      } catch (ParseException e) {
        this.logger.error(" getHolidayLabel ParseException", e);
        continue;
      }
      label.add(dt);
    }
  }

	public void getLovLabel(Document document, Map<String, Lov> lovMap) {
    if (lovMap == null)
      return;
    Element root = document.getRootElement();
    Lov lov = null;
    Element element = null; Element childNode = null;

    for (Iterator it = root.elementIterator(this.Node[0]); it.hasNext(); ) {
      element = (Element)it.next();
      lov = new Lov();

      for (Iterator child = element.elementIterator(this.Node[2]); child.hasNext(); ) {
        childNode = (Element)child.next();
        if ("model".equals(childNode.attributeValue(this.Node[1])))
          lov.setModelType(childNode.getText());
        else if ("service".equals(childNode.attributeValue(this.Node[1]))) {
          lov.setServiceType(childNode.getText());
        }
      }
      lovMap.put(element.attributeValue(this.Node[1]), lov);
    }
  }

  public void getComboxLabel(Document document, Map<String, List<Combox>> comboxMap) {
    if (comboxMap == null)
      return;
    Element root = document.getRootElement();
    List list = null;
    Combox combox = null;
    Element element = null; Element childNode = null;

    for (Iterator it = root.elementIterator(this.Node[0]); it.hasNext(); ) {
      element = (Element)it.next();
      list = new ArrayList();

      for (Iterator child = element.elementIterator(this.Node[2]); child.hasNext(); ) {
        childNode = (Element)child.next();
        combox = new Combox();
        combox.setName(childNode.getText());
        combox.setValue(childNode.attributeValue(this.Node[1]));
        String isDefault = childNode.attributeValue(this.Node[3]);
        if (isDefault == null)
          combox.setIsDefault(0);
        else {
          combox.setIsDefault(Integer.valueOf(childNode.attributeValue(this.Node[3])).intValue());
        }
        list.add(combox);
      }
      comboxMap.put(element.attributeValue(this.Node[1]), list);
    }
  }

  public void getAreaLabel(Document document, Map<String, TreeNode> areaMap) {
    Element element = null;
    Element roote = document.getRootElement();
    List<Area> list = new ArrayList();
    Area area = null;

    for (Iterator it = roote.elementIterator(this.aNode[0]); it.hasNext(); ) {
      element = (Element)it.next();
      area = new Area();
      area.setAreaCode(element.attributeValue(this.aNode[1]));
      area.setAreaName(element.attributeValue(this.aNode[2]));
      area.setParentCode(element.attributeValue(this.aNode[3]));
      list.add(area);
    }
    if ((areaMap == null) || (list.isEmpty()))
      return;
    areaMap.clear();
    this.treeMp = new ConcurrentHashMap();
		JcTreeNode treeNode = null;
    for (Area areaa : list) {
      treeNode = new JcTreeNode();
      treeNode.setId(areaa.getAreaCode());
      if ("000000".equals(areaa.getParentCode()))
        treeNode.setParentId("kinjo");
      else {
        treeNode.setParentId(areaa.getParentCode());
      }
      treeNode.setNodeValue(areaa.getAreaName());
      treeNode.setNodeName(areaa.getAreaName());
      this.treeMp.put(treeNode.getId(), treeNode);
    }
    try {
      super.constructTree();
      if (this.root == null)
        return;
      TreeNode child = null;
			for (Object itsub = new DepthIterator(this.root.iterator()); ((Iterator)itsub).hasNext(); ) {
        child = (TreeNode)((Iterator)itsub).next();
        if (child != null)
        {
          areaMap.put(child.getId(), child);
        }
      }
      JcTreeNode guo = new JcTreeNode();
      guo = this.root;
      areaMap.put("000000", guo);
    } catch (Exception e) {
      this.logger.error("load district area exception:", e);
    } finally {
      super.clear();
    }
  }

  protected void init()
  {
  }

  public String getTreeData(String condition)
  {
    return null;
  }
}