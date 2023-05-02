# lighthall-challenge4

<b>Get all users:</b> https://lighthall-challenge-4-backend.herokuapp.com/api/yelpCouples/users

<b>Get users </b>by ID:</b> https://lighthall-challenge-4-backend.herokuapp.com/api/yelpCouples/users/Vishal

    - JSON needs to be sent similar to:
        {
            "userDetails": {
                "username": "Vishal",
                "password": "123"
            }
        }

<b>Add user by ID:</b> https://lighthall-challenge-4-backend.herokuapp.com/api/yelpCouples/users

    - JSON is required:
        {
            "userDetails": {
                "username": "Vishal1",
                "password": "123"
            }
        }

<b>Yelp API calls to get restaurant:</b> https://lighthall-challenge-4-backend.herokuapp.com/api/yelpCouples/yelpAPI

    - JSON needs to be sent similar to:
        {
            "userPreferences": {
                "location": "8208, 161st Avenue Northeast, Redmond, WA",
                "categories": [
                    "chinese",
                    "taiwanese"
                ],
                "radius": 10000
            }
        }
    
    - Things needed:
        - location: Users location.
        - categories: the cusine the user and his couple wants
            - If both the cusins are available in single restuarant those will be returned
            - Else restaurants with atleast one of the cusine is returned.
        - radius: max distance between user and restaurant.

<b>Get Business by ID with reviews:</b> http://localhost:8000/api/yelpCouples/yelpAPI/business/${id}

---------------------

## Incase we make groups:

<b>Get all Groups:</b> https://lighthall-challenge-4-backend.herokuapp.com/api/yelpCouples/groups

<b>Add new Group:</b> ttps://lighthall-challenge-4-backend.herokuapp.com/api/yelpCouples/groups

    - JSON is required:
        {
            "groupDetails": {
                "groupName": "Vishal1", 
                "groupDesc": "123"
            }
        }
