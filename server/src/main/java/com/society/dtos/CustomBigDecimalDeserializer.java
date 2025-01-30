package com.society.dtos;

import java.io.IOException;
import java.math.BigDecimal;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class CustomBigDecimalDeserializer extends JsonDeserializer<BigDecimal> {

	@Override
	public BigDecimal deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JacksonException {
		try {
            return new BigDecimal(p.getText());
        } catch (NumberFormatException e) {
            return BigDecimal.ZERO;  // Fallback in case of invalid input
        }
	}

}
