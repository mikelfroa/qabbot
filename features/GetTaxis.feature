Feature: Get Taxis
    As a user I want to know all available taxis
    
    Scenario: Get all taxis
        And I add the path "taxis"
        When I use the method "get"
        And I send the request
        Then the response code is 200

    Scenario: Get all taxis from Madrid
        And I add the path "taxis/Madrid"
        When I use the method "get"
        And I send the request
        Then the response code is 200
        And the response contains "Madrid"

    Scenario: Get Skoda4 taxi from Madrid
        And I add the path "taxis/Madrid/Skoda4"
        When I use the method "get"
        And I send the request
        Then the response code is 200
        And the response contains "Skoda4"
        And the response contains "free"