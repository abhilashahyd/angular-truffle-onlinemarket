// var ConvertLib = artifacts.require("./ConvertLib.sol");
// var MetaCoin = artifacts.require("./MetaCoin.sol");
var Utils = artifacts.require("./library/Utils.sol");
var Store = artifacts.require("./Store.sol");
var MarketPlace = artifacts.require("./MarketPlace.sol");

module.exports = function(deployer) {
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  // deployer.deploy(MetaCoin);
  deployer.deploy(Utils);
  deployer.deploy(Store, "SuperAdmin Store", "This shall never be used by anyone!", 0, "");
  deployer.link(Utils, MarketPlace);
  deployer.deploy(MarketPlace);
};
