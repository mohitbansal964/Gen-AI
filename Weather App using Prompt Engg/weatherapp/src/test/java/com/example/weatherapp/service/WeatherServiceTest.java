package com.example.weatherapp.service;

import com.example.weatherapp.model.Weather;
import com.example.weatherapp.model.WeatherApiResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.util.ReflectionTestUtils;

import java.io.File;
import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class WeatherServiceTest {

    @InjectMocks
    private WeatherService weatherService;

    @Mock
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        ReflectionTestUtils.setField(weatherService, "weatherDataPath", "src/test/resources/weather/");
    }

    @Test
    void testGetWeatherByCity_Success() throws IOException {
        String city = "newyork";
        Weather weather = new Weather();
        weather.setCity("New York");
        weather.setTemperature(25.0);

        File file = new File("src/test/resources/weather/newyork.json");
        when(objectMapper.readValue(file, Weather.class)).thenReturn(weather);

        WeatherApiResponse response = weatherService.getWeatherByCity(city);

        assertTrue(response.isSuccess());
        assertEquals("New York", response.getWeather().getCity());
        assertEquals(25.0, response.getWeather().getTemperature());
    }

    @Test
    void testGetWeatherByCity_FileNotFound() {
        String city = "unknowncity";

        WeatherApiResponse response = weatherService.getWeatherByCity(city);

        assertFalse(response.isSuccess());
        assertEquals("Weather of unknowncity is not available", response.getErrorMessage());
    }

//    @Test
//    void testGetWeatherByCity_IOException() throws IOException {
//        String city = "newyork";
//
//        File file = new File("src/test/resources/weather/newyork.json");
//        when(objectMapper.readValue(file, Weather.class)).thenThrow(new IOException());
//
//        WeatherApiResponse response = weatherService.getWeatherByCity(city);
//
//        assertFalse(response.isSuccess());
//        assertEquals("Error reading weather data", response.getErrorMessage());
//    }
}
