var ScrollyTest = React.createClass({displayName: "ScrollyTest",
    statics: {
        small: [
            ['h1', "Small Article"],
            ['p', "Reverse the polarity of the positron flow EXTERMINATE! Dalekanium Hello, Captain Jack Harkness.  Geronimo Time Lord Are you my mummy? Bow ties are cool K-9 wibbly-wobbly timey-wimey Reverse the polarity of the neutron flow Hey, who turned out the lights? Donna Noble has left the library. Donna Noble has been saved. Donna Noble has left the library. Donna Noble has been saved. Hello, Captain Jack Harkness.  Reverse the polarity of the positron flow the oncoming storm I am a Dalek Tick tock goes the clock... you are not alone in the universe Stormageddon, Dark Lord of All Bananas are good Stormageddon, Dark Lord of All Bow ties are cool. Reverse the polarity of the neutron flow EXTERMINATE! Stormageddon, Dark Lord of All Demon's Run Davros It's bigger on the inside! wibbly wobbly timey wimey Hello Sweetie."],
            ['p', "END."]
        ],
        medium: [
            ['h1', "Medium Article"],
            ['p', "Reverse the polarity of the positron flow EXTERMINATE! Dalekanium Hello, Captain Jack Harkness.  Geronimo Time Lord Are you my mummy? Bow ties are cool K-9 wibbly-wobbly timey-wimey Reverse the polarity of the neutron flow Hey, who turned out the lights? Donna Noble has left the library. Donna Noble has been saved. Donna Noble has left the library. Donna Noble has been saved. Hello, Captain Jack Harkness.  Reverse the polarity of the positron flow the oncoming storm I am a Dalek Tick tock goes the clock... you are not alone in the universe Stormageddon, Dark Lord of All Bananas are good Stormageddon, Dark Lord of All Bow ties are cool. Reverse the polarity of the neutron flow EXTERMINATE! Stormageddon, Dark Lord of All Demon's Run Davros It's bigger on the inside! wibbly wobbly timey wimey Hello Sweetie. Bad Wolf  Demon's Run Davros Skaro Demon's Run EXTERMINATE! Puny Human! wibbly-wobbly timey-wimey Bad Wolf Bad Wolf you are not alone in the universe The Doctor IT is the Doctor! Enemy of the Daleks! The angels have the phone box puny human Silence will fall Bananas are good RUN! the girl who waited Rory the Roman Davros I really hate stairs. EXTERMINATE ALL STAIRCASES! EXTERMINATE! Hello, Captain Jack Harkness.  Would you like a jelly baby? The socks with holes, dummy! MY VISION IS IMPAIRED! Demon's Run I wear a fez now, fezzes are cool RUN! Would you like a jelly baby? Amy Pond The Master EXTERMINATE! Bad Wolf Bad Wolf Hey, who turned out the lights? EXTERMINATE! the girl who waited Are you my mummy? Would you like a jelly baby? Geronimo! Reverse the polarity of the neutron flow Hey, who turned out the lights? EXTERMINATE! Hello sweetie! Would you like a jelly baby? Delete. Delete. Delete. Hello sweetie! YOU WILL OBEY! The socks with holes, dummy! Stormageddon, Dark Lord of All The angels have the phone box Stormageddon, Dark Lord of All Geronimo wibbly wobbly timey wimey Emperor of the Daleks The Supreme Dalek Donna Noble wibbly-wobbly timey-wimey Cult of Skaro Hello sweetie! Hello Sweetie. Hello, Captain Jack Harkness. Silence will fall EXTERMINATE! The socks with holes, dummy! wibbly wobbly timey wimey Bow ties are cool."],
            ['p', "The Silence is Coming! We are Dalek Puny Human! K-9 the oncoming storm Demon's Run Cult of Skaro EXTERMINATE! EXTERMINATE! Tick tock goes the clock... Demon's Run Galifreyan EXTERMINATE! Demon's Run Rory the Roman Geronimo! Amy Pond River Song The Shadow Proclamation I hereby invoke The Shadow Proclamation! Reverse the polarity of the positron flow the girl who waited Time War Raxacoricofallapatorius Cult of Skaro Geronimo Reverse the polarity of the positron flow The socks with holes, dummy! EXTERMINATE! Hello sweetie! Cybermen Demon's Run The Supreme Dalek Time Lord Bad Wolf  Time Lord Allons-y Hello sweetie MY VISION IS IMPAIRED! You are better at dying The Silence is Coming! Would you like a jelly baby? I am a Dalek Skaro Spoilers! Davros Stormageddon, Dark Lord of All Amy Pond Amy Pond Time War Skaro"],
            ['p', "END."]
        ],
        large: [
            ['h1', "Large Article"],
            ['p', "Reverse the polarity of the positron flow EXTERMINATE! Dalekanium Hello, Captain Jack Harkness.  Geronimo Time Lord Are you my mummy? Bow ties are cool K-9 wibbly-wobbly timey-wimey Reverse the polarity of the neutron flow Hey, who turned out the lights? Donna Noble has left the library. Donna Noble has been saved. Donna Noble has left the library. Donna Noble has been saved. Hello, Captain Jack Harkness.  Reverse the polarity of the positron flow the oncoming storm I am a Dalek Tick tock goes the clock... you are not alone in the universe Stormageddon, Dark Lord of All Bananas are good Stormageddon, Dark Lord of All Bow ties are cool. Reverse the polarity of the neutron flow EXTERMINATE! Stormageddon, Dark Lord of All Demon's Run Davros It's bigger on the inside! wibbly wobbly timey wimey Hello Sweetie. Bad Wolf  Demon's Run Davros Skaro Demon's Run EXTERMINATE! Puny Human! wibbly-wobbly timey-wimey Bad Wolf Bad Wolf you are not alone in the universe The Doctor IT is the Doctor! Enemy of the Daleks! The angels have the phone box puny human Silence will fall Bananas are good RUN! the girl who waited Rory the Roman Davros I really hate stairs. EXTERMINATE ALL STAIRCASES! EXTERMINATE! Hello, Captain Jack Harkness.  Would you like a jelly baby? The socks with holes, dummy! MY VISION IS IMPAIRED! Demon's Run I wear a fez now, fezzes are cool RUN! Would you like a jelly baby? Amy Pond The Master EXTERMINATE! Bad Wolf Bad Wolf Hey, who turned out the lights? EXTERMINATE! the girl who waited Are you my mummy? Would you like a jelly baby? Geronimo! Reverse the polarity of the neutron flow Hey, who turned out the lights? EXTERMINATE! Hello sweetie! Would you like a jelly baby? Delete. Delete. Delete. Hello sweetie! YOU WILL OBEY! The socks with holes, dummy! Stormageddon, Dark Lord of All The angels have the phone box Stormageddon, Dark Lord of All Geronimo wibbly wobbly timey wimey Emperor of the Daleks The Supreme Dalek Donna Noble wibbly-wobbly timey-wimey Cult of Skaro Hello sweetie! Hello Sweetie. Hello, Captain Jack Harkness. Silence will fall EXTERMINATE! The socks with holes, dummy! wibbly wobbly timey wimey Bow ties are cool."],
            ['p', "The Silence is Coming! We are Dalek Puny Human! K-9 the oncoming storm Demon's Run Cult of Skaro EXTERMINATE! EXTERMINATE! Tick tock goes the clock... Demon's Run Galifreyan EXTERMINATE! Demon's Run Rory the Roman Geronimo! Amy Pond River Song The Shadow Proclamation I hereby invoke The Shadow Proclamation! Reverse the polarity of the positron flow the girl who waited Time War Raxacoricofallapatorius Cult of Skaro Geronimo Reverse the polarity of the positron flow The socks with holes, dummy! EXTERMINATE! Hello sweetie! Cybermen Demon's Run The Supreme Dalek Time Lord Bad Wolf  Time Lord Allons-y Hello sweetie MY VISION IS IMPAIRED! You are better at dying The Silence is Coming! Would you like a jelly baby? I am a Dalek Skaro Spoilers! Davros Stormageddon, Dark Lord of All Amy Pond Amy Pond Time War Skaro"],
            ['p', "RUN! Geronimo! Bow ties are cool. EXTERMINATE! YOU WILL OBEY! Reverse the polarity of the positron flow you are not alone in the universe The Silence is Coming! The Doctor EXTERMINATE! Hello, Captain Jack Harkness.  Davros Dalekanium Bow ties are cool. Bow ties are cool. Hello sweetie! Demon's Run Emperor of the Daleks You will be exterminated! EXTERMINATE! The Supreme Dalek you are not alone in the universe You will be exterminated! Davros Silence will fall River Song EXTERMINATE! Geronimo! Bad Wolf EXTERMINATE! River Song Hey, who turned out the lights? The Shadow Proclamation The Supreme Dalek EXTERMINATE! Geronimo EXTERMINATE! Rude and not ginger wibbly wobbly timey wimey Dalekanium puny human Bow ties are cool. Silence will fall The Shadow Proclamation Cult of Skaro Stormageddon, Dark Lord of All The Shadow Proclamation The socks with holes, dummy! Donna Noble has left the library. Donna Noble has been saved. EXTERMINATE! IT is the Doctor! Enemy of the Daleks!"],
            ['p', "The Supreme Dalek Silence will fall EXTERMINATE! Are you my mummy? You are better at dying Stormageddon, Dark Lord of All The socks with holes, dummy! I wear a fez now, fezzes are cool Donna Noble has left the library. Donna Noble has been saved. Bad Wolf Bananas are good EXTERMINATE! The Supreme Dalek Hello Sweetie. Bow ties are cool the oncoming storm EXTERMINATE! Bad Wolf  The Master Cybermen Hey, who turned out the lights? The Master Are you my mummy? IT is the Doctor! Enemy of the Daleks! you are not alone in the universe Reverse the polarity of the positron flow River Song EXTERMINATE! EXTERMINATE! It's bigger on the inside! I hereby invoke The Shadow Proclamation! River Song you are not alone in the universe You will be exterminated! EXTERMINATE! wibbly wobbly timey wimey Stormageddon, Dark Lord of All Galifrey Hello Sweetie. Hey, who turned out the lights? Bring the Humans to me Allons-y The Master The Silence is Coming! puny human Davros YOU WILL OBEY! The Silence is Coming! EXTERMINATE! I am a Dalek Davros"],
            ['p', "EXTERMINATE! Hello sweetie! Galifrey Bow ties are cool DON'T BLINK! Bow ties are cool EXTERMINATE! Are you my mummy? Reverse the polarity of the positron flow Hello, Captain Jack Harkness.  the girl who waited Bow ties are cool Emperor of the Daleks Dalekanium Reverse the polarity of the neutron flow wibbly wobbly timey wimey the girl who waited I wear a fez now, fezzes are cool Hello sweetie! you are not alone in the universe Galifrey Silence will fall Demon's Run The Doctor puny human EXTERMINATE! Tick tock goes the clock... Galifrey Donna Noble has left the library. Donna Noble has been saved. MY VISION IS IMPAIRED! Allons-y Geronimo We are Dalek You will be exterminated! Fantastic! Hello sweetie The Silence is Coming! Reverse the polarity of the neutron flow Reverse the polarity of the positron flow The Doctor Emperor of the Daleks The Silence is Coming! the girl who waited Puny Human! RUN! Tick tock goes the clock... Amy Pond The Silence is Coming! We are Dalek River Song IT is the Doctor! Enemy of the Daleks! Donna Noble The angels have the phone box The angels have the phone box The Supreme Dalek The Silence is Coming! The Supreme Dalek Davros YOU WILL OBEY! I wear a fez now, fezzes are cool Geronimo! Bow ties are cool You will be exterminated! YOU WILL OBEY! wibbly wobbly timey wimey Would you like a jelly baby? wibbly wobbly timey wimey RUN! Fantastic! Reverse the polarity of the neutron flow Bow ties are cool We are Dalek It's bigger on the inside! Hello, Captain Jack Harkness.  Amy Pond Delete. Delete. Delete. Are you my mummy? puny human ninehundred  EXTERMINATE! The Doctor Bow ties are cool Bad Wolf Reverse the polarity of the neutron flow Time Lord Galifrey The Silence is Coming! You will be exterminated! IT is the Doctor! Enemy of the Daleks! The Supreme Dalek DON'T BLINK! Fantastic! I wear a fez now, fezzes are cool EXTERMINATE! The socks with holes, dummy! Bow ties are cool. Rose Tyler Puny Human! Bow ties are cool. Donna Noble has left the library. Donna Noble has been saved. Hello sweetie!"],
            ['p', "END."]
        ]
    },
    getDefaultProps: function () {
        return {
            params: {}
        }
    },
    getInitialState: function () {
        return {
            disposed: false,
            nodes: [
                ['h1', "Scrolly.js"],
                ['h2', "React Component"]
            ]
        };
    },

    handleAppend: function (e) {
        var size = e.target.className;
        if (!size || !ScrollyTest[size]) {
            console.log('Unknown size:', e.target);
            return;
        }

        this.setState({
            nodes: this.state.nodes.concat(ScrollyTest[size])
        });
    },
    handleClear: function () {
        this.setState({
            nodes: []
        });
    },
    handleToggle: function () {
        this.setState({
            disposed: !this.state.disposed
        });
    },
    handleReset: function () {
        this.setState(this.getInitialState());
    },

    render: function () {
        var nodes = this.state.nodes.map(function (el, key) {
            return React.createElement(el[0], {key: key}, el[1]);
        });

        return (
            React.createElement("div", {className: "test"}, 
                React.createElement("p", {className: "test-buttons"}, 
                    "Add some more Text into scroll area:" + ' ' +
                    " ", 
                    React.createElement("button", {className: "small", onClick:  this.handleAppend}, "Small"), 
                    React.createElement("button", {className: "medium", onClick:  this.handleAppend}, "Medium"), 
                    React.createElement("button", {className: "large", onClick:  this.handleAppend}, "Large"), 
                    " – ", 
                    React.createElement("button", {onClick:  this.handleClear}, "Clear"), 
                    React.createElement("button", {onClick:  this.handleReset}, "Reset"), 
                    " – ", 
                    React.createElement("button", {onClick:  this.handleToggle},  this.state.disposed ? 'Enable' : 'Dispose'), 
                    " – ", 
                    React.createElement("a", {href: "../"}, "Main Demo"), ", ", 
                    React.createElement("a", {href: "https://github.com/annexare/scrolly.js"}, "View on GitHub")
                ), 
                
                    this.state.disposed
                    ? nodes
                    : React.createElement(Scrolly, {params:  this.params, ref: "scrolly"}, 
                         nodes 
                        )
                    
            )
        );
    }
});

if (typeof module !== 'undefined') {
    module.exports = ScrollyTest;
}
