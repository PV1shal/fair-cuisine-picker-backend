'use strict';
import yelp from 'yelp-fusion';

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'uwP7e36zc9a5e7N_GovpMHDJ_v_pcMmRzrHuzvuihfvgD5R8nocAlhUKBPXhgWh_KDbOyoW7D7nRreubcoFjS8vIIM-4CoOqgcHbIfnLsjnZCFvrRMXmTOHN4KlUZHYx';

const client = yelp.client(apiKey);

export default class yelpAPI {
    static async apiGetYelpAPI(req, res, next) {
        try {
            const categoriesResponse = await client.allCategories();
            const categoriesMap = new Map();
            categoriesResponse.jsonBody.categories.forEach((category) => {
                categoriesMap.set(category.title, category.alias);
            });

            const categoryAliases = req.body.userPreferences.categories.map(
                (category) => categoriesMap.get(category)
            );

            const searchRequest = {
                location: req.body.userPreferences.location,
                radius: req.body.userPreferences.radius || 10000,
                categories: categoryAliases.join(","),
            };
            const response = await client.search(searchRequest);
            const businesses = response.jsonBody.businesses;

            const businessesWithAllCategories = businesses.filter((business) => {
                const businessCategories = business.categories.map((category) => category.alias);
                return categoryAliases.every((alias) => businessCategories.includes(alias));
            });

            if (businessesWithAllCategories.length > 0) {
                return res.status(200).json({ yelpAPI: businessesWithAllCategories });
            } else {
                return res.status(201).json({ yelpAPI: businesses });
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
