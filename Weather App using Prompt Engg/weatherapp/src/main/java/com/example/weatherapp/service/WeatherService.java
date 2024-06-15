package com.example.weatherapp.service;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.weatherapp.model.Weather;
import com.example.weatherapp.model.WeatherApiResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class WeatherService {

	@Value("${weather.data.path}")
	private String weatherDataPath;

	public WeatherApiResponse getWeatherByCity(String city) {
		WeatherApiResponse response = new WeatherApiResponse();
		ObjectMapper mapper = new ObjectMapper();
		try {
			File file = new File(weatherDataPath + city.toLowerCase() + ".json");
			if (!file.exists()) {
				response.setSuccess(false);
				response.setErrorMessage("Weather of " + city + " is not available");
				return response;
			}
			Weather weather = mapper.readValue(file, Weather.class);
			response.setSuccess(true);
			response.setWeather(weather);
		} catch (IOException e) {
			response.setSuccess(false);
			response.setErrorMessage("Error reading weather data");
		}
		return response;
	}
}
