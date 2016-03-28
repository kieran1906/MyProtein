'use strict';

/*
*
*   AUTHOR: Kieran Wild
*
*   A class which houses all of the services that are required across the
*   system, adopting a factory method design so that any other classes
*   may request a service dynamically.
*
*/
var DataServices = class DataServices {
  constructor() {
    this.s = {};  // store services here

    // caches
    this.SPOT_CACHE = "spot_cache";
    this.USER_CACHE = "user_cache";
    this.HELP_CACHE = "help_cache";

    var cache_spot = new SpotCache();
    var cache_user = new UserCache();
    var cache_help = new HelpCache();

    // managers
    this.CARD_MANAGER     = "card_manager";
    this.SIDEBAR_MANAGER  = "sidebar_manager";
    this.ALERT_MANAGER    = "alert_manager";
    this.HEALTH_MANAGER   = "health_manager";

    var man_card    = new CardManager();
    var man_side    = new SidebarManager();
    var man_alert   = new AlertManager();
    var man_health  = new HealthManager();

    // set cache listeners
    cache_spot.setListener(man_side);
    cache_spot.setListener(man_card);

    cache_user.setListener(man_card.tab);
    cache_user.setListener(man_health);

    cache_help.setListener(man_side);

    // add to services list
    this.s[this.SPOT_CACHE]       = cache_spot;
    this.s[this.USER_CACHE]       = cache_user;
    this.s[this.HELP_CACHE]       = cache_help;
    this.s[this.CARD_MANAGER]     = man_card;
    this.s[this.SIDEBAR_MANAGER]  = man_side;
    this.s[this.ALERT_MANAGER]    = man_alert;
    this.s[this.HEALTH_MANAGER]   = man_health;
  }

  getService(name) { return this.s[name]; }
}
