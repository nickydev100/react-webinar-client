/*import axios from "axios";
const HOST = window._env_.API_URL;
const ROUTE = 'api/v1';*/

export const fetchWebinars = async (currentPage, itemsPerPage) => {
    /*
    const response = await axios.get(`${HOST}/${ROUTE}/SOMETHING PENDING/`, {headers: {'Content-Type': 'application/json'}});
    */
    debugger;

    const response = {
        data: {
            nextWebinar: {
                name: "Some webinar name",
                dateTime: "Today at 03PM (Eastern)"
            },
            totalScheduledWebinars: 15,
            totalScheduledWebinarsAvgMinutes: 42,
            webinarsList: [],
            webinarsQty: 0,
        }
    };

    const webinars = [];
    for (let i = 1; i < 30; i++) {
        webinars.push({
            title: "Some webinar",
            duration: "1hr 12mins",
            presenters: ["You", "Billy", "Carol Sempter", "Vikram Singh"],
            registered: 10,
            webinarCapacity: 100,
        }, {
            title: "Some other webinar",
            duration: "1hr 43mins",
            presenters: ["You"],
            registered: 86,
            webinarCapacity: 89,
        }, {
            title: "Random webinar",
            duration: "45mins",
            presenters: ["Carol Sempter", "Cikram Singh"],
            registered: 50,
            webinarCapacity: 150,
        }, {
            title: "Random aksdjfklasdkf webinar",
            duration: "40mins",
            presenters: ["Carol Sempter"],
            registered: 20,
            webinarCapacity: 100,
        });
    }
    const offset = currentPage * itemsPerPage;
    response.data.webinarsQty = webinars.length;
    response.data.webinarsList = webinars.slice(offset, offset + itemsPerPage);
    return {data: response.data};
};


