package com.six.core.utils;

import com.six.core.logger.SimpleLogger;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.StringWriter;
import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.JavaType;

public class PojoMapper {
	static SimpleLogger logger = SimpleLogger.getLogger(PojoMapper.class);

	private static ObjectMapper m = new ObjectMapper();
	private static JsonFactory jf = new JsonFactory();

	public static <T> Object fromJson(String jsonAsString, Class<T> pojoClass) {
		try {
			return m.readValue(jsonAsString, pojoClass);
		} catch (JsonParseException e) {
			logger.error(" get object fromJson JsonParse exception: ", e);
		} catch (JsonMappingException e) {
			logger.error(" get object fromJson JsonMapping exception: ", e);
		} catch (IOException e) {
			logger.error(" get object fromJson io exception: ", e);
		}
		return null;
	}

	public static <T> Object fromJson(String jsonAsString, JavaType javaType) {
		try {
			return m.readValue(jsonAsString, javaType);
		} catch (JsonParseException e) {
			logger.error(" get object fromJson JsonParse exception: ", e);
		} catch (JsonMappingException e) {
			logger.error(" get object fromJson JsonMapping exception: ", e);
		} catch (IOException e) {
			logger.error(" get object fromJson io exception: ", e);
		}
		return null;
	}

	public static <T> Object fromJson(FileReader fr, Class<T> pojoClass) {
		try {
			return m.readValue(fr, pojoClass);
		} catch (JsonParseException e) {
			logger.error(" get object fromJson JsonParse exception: ", e);
		} catch (JsonMappingException e) {
			logger.error(" get object fromJson JsonMapping exception: ", e);
		} catch (IOException e) {
			logger.error(" get object fromJson io exception: ", e);
		}
		return null;
	}

	public static String toJson(Object pojo, boolean prettyPrint) {
		StringWriter sw = new StringWriter();
		try {
			JsonGenerator jg = jf.createJsonGenerator(sw);
			if (prettyPrint) {
				jg.useDefaultPrettyPrinter();
			}
			m.writeValue(jg, pojo);
		} catch (JsonParseException e) {
			logger.error(" get object fromJson JsonParse exception: ", e);
		} catch (JsonMappingException e) {
			logger.error(" get object fromJson JsonMapping exception: ", e);
		} catch (IOException e) {
			logger.error(" get object fromJson io exception: ", e);
		}
		return sw.toString();
	}

	public static String toJson(Object pojo) {
		StringWriter sw = new StringWriter();
		try {
			JsonGenerator jg = jf.createJsonGenerator(sw);
			m.writeValue(jg, pojo);
		} catch (JsonParseException e) {
			logger.error(" get object fromJson JsonParse exception: ", e);
		} catch (JsonMappingException e) {
			logger.error(" get object fromJson JsonMapping exception: ", e);
		} catch (IOException e) {
			logger.error(" get object fromJson io exception: ", e);
		}
		return sw.toString();
	}

	public static void toJson(Object pojo, FileWriter fw, boolean prettyPrint) {
		try {
			JsonGenerator jg = jf.createJsonGenerator(fw);
			if (prettyPrint) {
				jg.useDefaultPrettyPrinter();
			}
			m.writeValue(jg, pojo);
		} catch (JsonGenerationException e) {
			logger.error(" get object fromJson JsonGenerationException exception: ", e);
		} catch (JsonMappingException e) {
			logger.error(" get object fromJson JsonMapping exception: ", e);
		} catch (IOException e) {
			logger.error(" get object fromJson io exception: ", e);
		}
	}
}