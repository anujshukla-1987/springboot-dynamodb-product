package com.springboot.inventory;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.inventory.model.Product;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = InventoryApplication.class, webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
public class InventoryApplicationTests {

	public static final String URL = "http://localhost";

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	protected WebApplicationContext wac;

	@Before
	public void setup() {
		mockMvc = webAppContextSetup(wac).build();
	}

	@Test
	public void whenStartingApplication_thenCorrectStatusCode() throws Exception {
		mockMvc.perform(get("/api/products")).andExpect(status().is2xxSuccessful());
	};

	@Test
	@DirtiesContext(methodMode = DirtiesContext.MethodMode.BEFORE_METHOD)
	public void whenAddingNewCorrectProduct_thenCorrectStatusCodeAndResponse() throws Exception {
		Product product = new Product();
		product.setProductName("ProductTest");
		product.setLocation("LocationTest");
		product.setReserved(false);

		mockMvc.perform(post("/api/products/add", product).contentType(MediaType.APPLICATION_JSON)
				.content(new ObjectMapper().writeValueAsString(product))).andExpect(status().is2xxSuccessful());

	}

}
