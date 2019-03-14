Feature: Errors Gettings a taxi
    As a user I want to know all available taxis but I get some errors

    # The endpoint should retrieve an error when try to get the taxis from an incorrect location
    # It is returning a 200
    Scenario: Get all cabs from an incorrect location
        And I add the path "taxis/nonExistingLocation"
        When I use the method "get"
        And I send the request
        Then the response code is 500

    # The endpoint should retrieve an error when try to get the taxis from an incorrect taxi id
    # It is returning a 200
    Scenario: Get all cabs from an incorrect taxi id
        And I add the path "taxis/Madrid/nonExistingTaxiId"
        When I use the method "get"
        And I send the request
        Then the response code is 500