package com.example.weatherapp.controller;

import com.example.weatherapp.model.WeatherApiResponse;
import com.example.weatherapp.service.WeatherService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @Operation(summary = "Get weather by city")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved weather data"),
            @ApiResponse(responseCode = "400", description = "City not found")
    })
    
    @GetMapping("/weather/{city}")
    public ResponseEntity<WeatherApiResponse> getWeather(@PathVariable String city) {
        WeatherApiResponse response = weatherService.getWeatherByCity(city);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }
}
