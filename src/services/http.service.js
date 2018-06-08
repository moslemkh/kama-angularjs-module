﻿httpService.$inject = ['$http'];
export default function httpService($http) {
    $http.defaults.transformResponse.push(transformResponse);

    return {};

    function transformResponse(data) {
        if (typeof data === 'object')
            return convertDates(data);
        else
            return data;

        function convertDates(input) {
            if (Object.prototype.toString.call(input) === '[object Array]') {
                for (let i = 0; i < input.length; i++) {
                    input[i] = convertDates(input[i]);
                }
            }
            else if (Object.prototype.toString.call(input) === '[object Object]') {
                for (let key in input) {
                    if (input.hasOwnProperty(key))
                        input[key] = convertDates(input[key]);
                }
            }
            else if (typeof input === 'string' && input.indexOf('/Date(') !== -1 && input.indexOf(')/') !== -1)
                input = new Date(parseInt(input.substr(6))); // convert date string to date object

            return input;
        }
    }
}