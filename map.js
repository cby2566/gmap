var OSMAP = {
    map: null,
    marker: new Array,
    popup: new Array,
    loc: null,
    setMarker: function (index, latlng) {
        if (!this.marker[index]) {
            this.marker[index] = L.marker(latlng)
                .addTo(this.map);
        } else {
            this.marker[index].setLatLng(latlng);
        }
    },
    popupMarker: function (index, text) {
        if (!this.popup[index]) {
            this.popup[index] = this.marker[index].bindPopup(text)
                .openPopup();
            this.popup[index].autoPan = true;
        }
    },
    setTooltip: function (index, text) {
        if (this.marker[index]) {
            this.marker[index].bindTooltip(text).openTooltip();
        }
    },
    setCenter: function (latlng) {
        this.map.setView(latlng);
    },
    // init: function (div, lat, lng, zoom) {
    //     if (this.map) return;
    //     this.map = L.map(div).setView([lat, lng], zoom);

    //     // 'https://{s}.tile.osm.org/{z}/{x}/{y}.png'
    //     L.tileLayer("http://mt0.google.cn/vt/lyrs=m@160000000&hl=zh-CN&gl=CN&src=app&y={y}&x={x}&z={z}&s=Ga", {
    //         mixZoom: 6,
    //         maxZoom: 18,
    //         attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>contributors'
    //     }).addTo(this.map);
    // },
    
    init: function (div, lat, lng, zoom) {
       
        if (this.map) return;
        this.map = new google.maps.Map(document.getElementById(div), {
            zoom: zoom,
            center: new google.maps.LatLng(lat, lng),
            // mapTypeId: 'terrain'
        });
    },
    getCurrentLocation: function () {
        var options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 10000,
        };
        navigator.geolocation.getCurrentPosition(function (pos) {
            OSMAP.loc = pos.coords;
        }, null, options);
    }
};