'use strict';
import yelp from 'yelp-fusion';

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = '-XWAGMmaXC5v_RZzrN9aov6aNOMaBS4HBXR7Jd0J-Rh5Yk8lTDNFBt_fIm5G4NEb2RYADVTTkMku_ENfFlflPTPCXBAJ4sLBEO01Q1BeY_KFg3bIxpOIS6vKfhRQZHYx';

const client = yelp.client(apiKey);

export default class yelpAPI {
    static async apiGetYelpAPI(req, res, next) {
        const userPreferences = req.body.userPreferences || {};
        const categories = userPreferences.categories;
        const searchRequest = {
            location: userPreferences.location,
            categories: categories,
            radius: userPreferences.radius || 10000,
        };
        try {
            const response = await client.search(searchRequest);
            const businesses = response.jsonBody.businesses;
            const filteredBusinesses = businesses.filter(business =>
                categories.every(category => business.categories.some(cat => cat.alias === category))
            );
            if (filteredBusinesses.length > 0) {
                res.status(200).json({ yelpAPI: filteredBusinesses });
            } else {
                res.status(201).json({ yelpAPI: businesses });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async apiGetBusinessAndReviewsById(req, res, next) {
        const businessId = req.params.id || {};
        try {
            const response = await client.business(businessId);
            const reviews = await client.reviews(businessId, { limit: 15 });
            var { error } = response;
            if (error) {
                res.status(400).json({ error: "Unable to get business" });
            } else {
                res.json({ business: response.jsonBody, reviews: reviews.jsonBody.reviews });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
