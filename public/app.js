var ractive = new Ractive({
	el: 'clicktoenterapp',
	template: '#main',
	data: {
		items: [{
			img: 'http://1.darkroom.stylist.co.uk/320/fc5764b7d0cd107983b7cff36a70c8a0:9e13a4b2d98707f3dabc52de64a1486a/fm-win-channel-hero-1.jpg 320w, http://1.darkroom.stylist.co.uk/445/fc5764b7d0cd107983b7cff36a70c8a0:54270ae822a153b99637dd2e9c40f42f/fm-win-channel-hero-1.jpg 445w, http://1.darkroom.stylist.co.uk/685/fc5764b7d0cd107983b7cff36a70c8a0:261009455820b3db8c92f069b12d22d1/fm-win-channel-hero-1.jpg 685w, http://1.darkroom.stylist.co.uk/700/fc5764b7d0cd107983b7cff36a70c8a0:7ad8d434596a9a2ab8f3c60c54bca4cd/fm-win-channel-hero-1.jpg 700w, http://1.darkroom.stylist.co.uk/1025/fc5764b7d0cd107983b7cff36a70c8a0:a2b91c28734b09958f363c48861ac602/fm-win-channel-hero-1.jpg 1025w',
			headline: 'Win Exclusive Prizes With Harrods',
			content: 'Need a wardrobe refresh? Channel the new trends and win seasonal exclusives from Harrods during Fashion Month',
			url: 'http://www.stylist.co.uk/win/fashion-month'
		}]
	}
});