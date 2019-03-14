Feature: Errors Reserving a Taxi
    As a user I want to reserve a taxi but I get some errors
    
    Scenario: Reserve a non existing taxi
        And I add the path "taxis/Madrid/nonExixtingTaxi"
        When I use the method "post"
        And I set the body
        """
        {"state": "hired"}
        """
        And I send the request
        Then the response code is 404

    Scenario: Reserve a taxi with empty body
        And I add the path "taxis/Madrid/Skoda4"
        When I use the method "post"
        And I send the request
        Then the response code is 400

    Scenario: Reserve a taxi with incorrect body
        And I add the path "taxis/Madrid/Skoda4"
        When I use the method "post"
        And I set the body
        """
        {"state": "free"}
        """
        And I send the request
        Then the response code is 403
