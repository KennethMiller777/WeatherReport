package com.Weather.Report.controllers;

import java.io.InputStream;
import java.io.InputStreamReader;
import javax.print.DocFlavor.URL;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.databind.util.JSONPObject;
import io.micrometer.core.instrument.util.IOUtils;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Controller
public class MainController {

    @GetMapping( value = {"", "/"})
    public String load() {
        return "MainView";
    }

    @RequestMapping(value = "/GetCoordinates", method = RequestMethod.POST, produces="application/json")
    public @ResponseBody String GetCoordinates(String strLat, String strLong) { //take in lat and long

        String strURL = String.format("https://api.weather.gov/points/%s,%s", strLat, strLong);
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(strURL, String.class);

        return result; //return result
    }

    @RequestMapping(value = "/GetWeather", method = RequestMethod.POST, produces="application/json")
    public @ResponseBody String GetWeather(String strOffice, String strCoorX, String strCoorY) { //take in coordinates and office grid id

        String strURL = String.format("https://api.weather.gov/gridpoints/%s/%s,%s/forecast", strOffice, strCoorX, strCoorY);
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(strURL, String.class);

        return result; //return result
    }
}