Feature: Weather Information

  Scenario: User fetches weather information for a valid city
    Given I am on the weather app page
    When I enter "Mumbai" in the city input
    And I click the "Get Weather" button
    Then I should see the weather information for "Mumbai"

  Scenario: User fetches weather information for an invalid city
    Given I am on the weather app page
    When I enter "InvalidCity" in the city input
    And I click the "Get Weather" button
    Then I should see an error message "Weather of InvalidCity is not available"

  Scenario: User fetches weather information with an empty input
    Given I am on the weather app page
    When I enter "" in the city input
    And I click the "Get Weather" button
    Then I should see an error message "Error fetching weather data."

  Scenario: API returns an error
    Given I am on the weather app page
    When I enter "ErrorCity" in the city input
    And I click the "Get Weather" button
    Then I should see an error message "Weather of ErrorCity is not available"
