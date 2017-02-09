package com.six.core.utils;

import com.six.core.exception.NestedBusinessException;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;
import java.io.File;
import java.io.FilenameFilter;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Pattern;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

public class XmlUtils {
	public static Document getDocument(String path) throws DocumentException {
		Document document = null;
		SAXReader reader = new SAXReader();
		File file = new File(path);
		if (file.exists()) {
			document = reader.read(file);
		}
		return document;
	}

	public static Document parseStringDoc(String xml) throws DocumentException {
		return DocumentHelper.parseText(xml);
	}

	public static String languages(String language) {
		String[] l = language.split("_");
		if (l.length == 2) {
			return l[1].toUpperCase();
		}
		return "CN";
	}

	public static String[] fileList(String path, final String regex) {
		File filepath = new File(path);
		String[] list = filepath.list(new FilenameFilter() {
			private Pattern pattern = Pattern.compile(regex);

			public boolean accept(File dir, String filename) {
				return this.pattern.matcher(new File(filename).getName()).matches();
			}
		});
		return list;
	}

	public static Object simpleXmlToObject(String xml, Object obj) {
		XStream xStream = new XStream(new DomDriver());
		toListGenericsAlias(xStream, obj);
		xStream.alias(obj.getClass().getSimpleName(), obj.getClass());
		Object reobj = xStream.fromXML(xml);
		return reobj;
	}

	public static Object simpleXmlToObject(InputStream stream, Object obj) {
		XStream xStream = new XStream(new DomDriver());
		toListGenericsAlias(xStream, obj);
		xStream.alias(obj.getClass().getSimpleName(), obj.getClass());
		Object reobj = xStream.fromXML(stream);
		return reobj;
	}

	public static String simpleObjectToXml(Object obj) {
		XStream xStream = new XStream();
		toListGenericsAlias(xStream, obj);
		xStream.alias(obj.getClass().getSimpleName(), obj.getClass());
		String xml = xStream.toXML(obj).replace("__", "_");
		return (xml != null) && (!"".equals(xml)) ? xml : null;
	}

	public static <T> List<T> xml2list(Document document, Class<T> t) {
		List list = new ArrayList();
		StringBuffer sb = new StringBuffer();
		try {
			for (Iterator iterator = document.getRootElement().elementIterator(); iterator.hasNext();) {
				Element iter = (Element) iterator.next();
				Object entity = Class.forName(t.getName()).newInstance();
				for (Iterator supiterator = iter.elementIterator(); supiterator.hasNext();) {
					Element supiter = (Element) supiterator.next();
					sb.append(supiter.getName());
					sb.setCharAt(0, Character.toUpperCase(sb.charAt(0)));
					Method m = entity.getClass().getMethod("set" + sb.toString(),
							new Class[] { entity.getClass().getDeclaredField(supiter.getName()).getType() });
					m.invoke(entity, new Object[] { supiter.getText() });
					sb.setLength(0);
				}
				list.add(entity);
			}
		} catch (Exception e) {
			throw new NestedBusinessException("xml2list exception", e);
		}
		return list;
	}

	private static void toListGenericsAlias(XStream xStream, Object obj) {
		Field[] fs = obj.getClass().getDeclaredFields();
		for (Field f : fs) {
			Class fieldClazz = f.getType();

			if (fieldClazz.isAssignableFrom(List.class)) {
				Type fc = f.getGenericType();
				if (fc != null) {
					if ((fc instanceof ParameterizedType)) {
						ParameterizedType pt = (ParameterizedType) fc;
						Class genericClazz = (Class) pt.getActualTypeArguments()[0];
						xStream.alias(genericClazz.getSimpleName(), genericClazz);
					}
				}
			}
		}
	}
}