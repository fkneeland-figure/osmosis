(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{473:function(t,e,a){"use strict";a.r(e);var s=a(7),n=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"pool-incentives"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#pool-incentives"}},[t._v("#")]),t._v(" Pool Incentives")]),t._v(" "),a("p",[t._v("The incentives module provides users the functionality to create gauges, which\ndistributes reward tokens to the qualified lockups. Each lockup has designated\nlockup duration that indicates how much time that the user have to wait until\nthe token release after they request to unlock the tokens.")]),t._v(" "),a("h2",{attrs:{id:"creating-gauges"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#creating-gauges"}},[t._v("#")]),t._v(" Creating Gauges")]),t._v(" "),a("p",[t._v("To initialize a gauge, the creator should decide the following parameters:")]),t._v(" "),a("ul",[a("li",[t._v("Distribution condition: denom to incentivize and minimum lockup duration.")]),t._v(" "),a("li",[t._v("Rewards: tokens to be distributed to the lockup owners.")]),t._v(" "),a("li",[t._v("Start time: time when the distribution will begin.")]),t._v(" "),a("li",[t._v("Total epochs: number of epochs to distribute over. (Osmosis epochs are 1 day each, ending at 5PM UTC everyday)")])]),t._v(" "),a("p",[t._v("Making transaction is done in the following format:")]),t._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("osmosisd tx incentives create-gauge "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("denom"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("reward"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" \n  --duration "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("minimum duration "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" lockups, nullable"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  --start-time "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("start "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("time")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" RFC3339 or unix format, nullable"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# one of --perpetual or --epochs")]),t._v("\n  --epochs "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("total distribution epoch"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  --perpetual\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br")])]),a("h3",{attrs:{id:"examples"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#examples"}},[t._v("#")]),t._v(" Examples")]),t._v(" "),a("h4",{attrs:{id:"case-1"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#case-1"}},[t._v("#")]),t._v(" Case 1")]),t._v(" "),a("p",[t._v("I want to make incentives for LP tokens of pool X, namely LPToken, that have been locked up for at least 1 day.\nI want to reward 1000 Mytoken to this pool over 2 days (2 epochs). (500 rewarded on each day)\nI want the rewards to start disbursing at 2022 Jan 01.")]),t._v(" "),a("p",[t._v("MsgCreateGauge:")]),t._v(" "),a("ul",[a("li",[t._v('Distribution condition: denom "LPToken", 1 day.')]),t._v(" "),a("li",[t._v("Rewards: 1000 MyToken")]),t._v(" "),a("li",[t._v("Start time: 1624000706 (in unix time format)")]),t._v(" "),a("li",[t._v("Total epochs: 2 (days)")])]),t._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("osmosisd tx incentives create-gauge LPToken 1000MyToken "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --duration 24h "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --start-time "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2022")]),t._v("-01-01T00:00:00Z "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --epochs "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br")])]),a("h4",{attrs:{id:"case-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#case-2"}},[t._v("#")]),t._v(" Case 2")]),t._v(" "),a("p",[t._v("I want to make incentives for atoms that have been locked up for at least 1 month.\nI want to reward 1000 MyToken to atom holders perpetually. (Meaning I add more tokens to this gauge myself every epoch)\nI want the reward to start disbursing immedietly.")]),t._v(" "),a("p",[t._v("MsgCreateGauge:")]),t._v(" "),a("ul",[a("li",[t._v('Distribution condition: denom "atom", 720 hours.')]),t._v(" "),a("li",[t._v("Rewards: 1000 MyTokens")]),t._v(" "),a("li",[t._v("Start time: empty(immedietly)")]),t._v(" "),a("li",[t._v("Total epochs: 1 (perpetual)")])]),t._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("osmosisd tx incentives create-gauge atom 1000MyToken\n  --perpetual "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("  \n  --duration 168h \n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br")])]),a("p",[t._v("I want to refill the gauge with 500 MyToken after the distribution.")]),t._v(" "),a("p",[t._v("MsgAddToGauge:")]),t._v(" "),a("ul",[a("li",[t._v("Gauge ID: (id of the created gauge)")]),t._v(" "),a("li",[t._v("Rewards: 500 MyTokens")])]),t._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("osmosisd tx incentives add-to-gauge "),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$GAUGE_ID")]),t._v(" 500MyToken\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])])])}),[],!1,null,null,null);e.default=n.exports}}]);