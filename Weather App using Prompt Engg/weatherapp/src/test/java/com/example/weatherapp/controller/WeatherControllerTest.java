package com.example.weatherapp.controller;

import com.example.weatherapp.model.Weather;
import com.example.weatherapp.model.WeatherApiResponse;
import com.example.weatherapp.service.WeatherService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.http.HttpStatus.*;

class WeatherControllerTest {

    @InjectMocks
    private WeatherController weatherController;

    @Mock
    private WeatherService weatherService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetWeather_Success() {
        String city = "newyork";
        Weather weather = new Weather();
        weather.setCity("New York");
        weather.setTemperature(25.0);

        WeatherApiResponse apiResponse = new WeatherApiResponse();
        apiResponse.setSuccess(true);
        apiResponse.setWeather(weather);

        when(weatherService.getWeatherByCity(city)).thenReturn(apiResponse);

        ResponseEntity<WeatherApiResponse> response = weatherController.getWeather(city);

        assertEquals(OK, response.getStatusCode());
        assertTrue(response.getBody().isSuccess());
        assertEquals("New York", response.getBody().getWeather().getCity());
    }

    @Test
    void testGetWeather_CityNotFound() {
        String city = "unknowncity";

        WeatherApiResponse apiResponse = new WeatherApiResponse();
        apiResponse.setSuccess(false);
        apiResponse.setErrorMessage("Weather of unknowncity is not available");

        when(weatherService.getWeatherByCity(city)).thenReturn(apiResponse);

        ResponseEntity<WeatherApiResponse> response = weatherController.getWeather(city);

        assertEquals(BAD_REQUEST, response.getStatusCode());
        assertFalse(response.getBody().isSuccess());
        assertEquals("Weather of unknowncity is not available", response.getBody().getErrorMessage());
    }

    @Test
    void testGetWeather_ErrorReadingData() {
        String city = "newyork";

        WeatherApiResponse apiResponse = new WeatherApiResponse();
        apiResponse.setSuccess(false);
        apiResponse.setErrorMessage("Error reading weather data");

        when(weatherService.getWeatherByCity(city)).thenReturn(apiResponse);

        ResponseEntity<WeatherApiResponse> response = weatherController.getWeather(city);

        assertEquals(BAD_REQUEST, response.getStatusCode());
        assertFalse(response.getBody().isSuccess());
        assertEquals("Error reading weather data", response.getBody().getErrorMessage());
    }
}
