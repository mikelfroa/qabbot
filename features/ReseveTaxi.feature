Feature: Reserve a Taxi
    As a user I want to reserve a taxi
    
    Scenario: Reserve a Skoda4 taxi in Madrid
        And I add the path "taxis/Madrid/Skoda4"
        When I use the method "post"
        And I set the body
        """
        {"state": "hired"}
        """
        And I send the request
        Then the response code is 200
        And the response contains "Madrid"
        And the response contains "Skoda4"
        And the response contains "hired"

    Scenario: Try to reserve a taxi already reserved
        And I add the path "taxis/Madrid/Skoda4"
        When I use the method "post"
        And I set the body
        """
        {"state": "hired"}
        """
        And I send the request
        And I send the request
        Then the response code is 403
