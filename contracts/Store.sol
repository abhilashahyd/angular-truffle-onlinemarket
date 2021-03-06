pragma solidity ^0.4.22;

import "./EIP20.sol";

/**
 * This contract will create all the functionalities related to a store.
 *
 * For example
 * - Adding a product
 * - updating a product
 * - customer being able to view the list of stores
 * - store owner being able to see the stores
 * - customer being able to view the products in a given Store
 *
 * BP2: Restricting Access:
 *  - Restrict other contracts’ access to the state by making all the state variables private.
*/
contract Store {
    using SafeMath for uint256;

    // Onwer is the actual store owner who is creating the store.
    address private owner;
    string private storeName;
    string private description;
    uint private storeId;
    uint private productCount;
    uint private nextProductId;
    Product[] private products;
    EIP20 private eip20Token;

    /**
    * At some stage we can oraclize the token price. However, for now let's consider this
    * for the sake of any calculation.
    */
    uint256 constant private tokenPriceInWei = 10000000000000;

    enum ProductStatus {
        ACTIVE,
        REMOVED
    }

    struct Product {
        uint productId;
        string productName;
        string description;
        uint price;
        uint quantity;
        ProductStatus status;
        uint256 discountPercentage;
    }

    event NewProduct(
      uint productId,
      string productName,
      string description,
      uint price,
      uint quantity
      );

    event PurchaseOfProduct(
        uint productId,
        uint quantity,
        address storeAddress,
        address storeOwner,
        address buyerAddress,
        uint senderBalance,
        uint weiToTransfer
      );

    event LogAsEvent(address param1, address param2, string param3);
    /**
    * @dev Creates a Store Contract which holds the associated products and the balance corresponding to the
    *      sales of such products.
    * @param _storeName - the name of the stores
    * @param _description - the description about the stores
    * @param _storeId - the store id of the store, which will be unique across the market place
    * @param _storeOwner - the actual owner of the store (will be an externally owned accounts)
    */
    constructor(
            string _storeName,
            string _description,
            uint _storeId,
            address _storeOwner,
            EIP20 _eip20Token ) public {

        owner = _storeOwner;
        storeName = _storeName;
        storeId = _storeId;
        description = _description;
        productCount = 0;
        nextProductId = 1;
        eip20Token = _eip20Token;
    }

    /**
    * Since this contract needs to accept ether, declare an anonymous payable function.
    */
    function() public payable { }

    /**
     * Only (store) owners shall be allowed to add or update the store specific details - e.g. product.
     *
    */
    modifier onlyOwner {
        require( (owner == msg.sender), "Only a store owner can invoke this function!");
        _;
    }

    /**
    * A function to return the state details for a given store contract
    * @return a list of values with the following details
    *   - Owner Address
    *   - Store name
    *   - Store identifier
    *   - Store description
    */
    function getStoreDetails() public view returns( address, string, uint, string ) {
      return (owner, storeName, storeId, description);
    }

     /**
     * A store owner will use this function to add a new product to his / her store.
     *
     * Whenever a new product is added, the product map will be updated to hold all the product and their details
     * across all the store and store owners.
     *
     * TODO: Add expiry feature and use the Auto Deprecation pattern to expire a product. Also, implement the use case
     *      that will prevent the shoppers from buying an expired product!
     *
    */
    function addProductToTheStore(
            string productName,
            string productDesc,
            uint price,
            uint quantity ) public onlyOwner returns(uint) {

            uint256 discountPercentage = 10;
            products.length += 1;

            products[productCount] = Product(
                nextProductId,
                productName,
                productDesc,
                price,
                quantity,
                ProductStatus.ACTIVE,
                discountPercentage );

            emit NewProduct(
              nextProductId,
              productName,
              productDesc,
              price,
              quantity
              );

            productCount++;

            return nextProductId++;
    }

    /**
     * The update product function will be called to update the details of an existing function.
     *
     * In a regular course of a business, the following amounts may get updated.
     * - quantity
     * - productName
     * - price
     * - description
     *
     * TODO : Add an additional parameter for discountPercentage
     *
    */
    function updateProduct(
            uint productId,
            string productName,
            string productDesc,
            uint price,
            uint quantity ) public onlyOwner returns(bool) {
        uint productIndex = productId - 1;
        require( products[productIndex].productId != 0 , "Product for the given store id and product id combination does not exist!");

        products[productIndex].productName = productName;
        products[productIndex].description = productDesc;
        products[productIndex].price = price;
        products[productIndex].quantity = quantity;

        return true;
    }

    /**
     * A store owner can decide to remove a product from his/her store.
     * A removed product will not be visible to shoppers!
     *
    */
    function removeProduct(uint _productId ) public onlyOwner returns(bool){
        uint productIndex = _productId - 1;

        require( products[productIndex].status == ProductStatus.ACTIVE, "Only the active product can be be removed from the store!");
        products[productIndex].status = ProductStatus.REMOVED;

        return true;
    }

    /**
     * A store owner can decide to remove a product from his/her store.
     * A removed product will not be visible to shoppers!
     *
    */
    function reActivateProduct(uint _productId ) public onlyOwner returns(bool){
        uint productIndex = _productId - 1;

        require( products[productIndex].status == ProductStatus.REMOVED, "Only the Inactive product can be activated!");
        products[productIndex].status = ProductStatus.ACTIVE;

        return true;
    }

    /**
    * getProducts will return all the products of this store.
    */
    function getProducts( bool activeOnlyFlag ) public view returns( uint[] ) {

      uint numOfProducts = 0;

      if ( activeOnlyFlag == true) {
        for (uint8 prodCount=0; prodCount<products.length; prodCount++) {
            if (products[prodCount].status == ProductStatus.ACTIVE) {
                numOfProducts++;
            }
        }
      } else {
        numOfProducts = products.length;
      }


      uint[] memory productIds = new uint[](numOfProducts);

      if ( numOfProducts > 0 ) {

        uint8 tmpCount = 0;

        for (prodCount=0; prodCount<products.length; prodCount++) {
            if ( activeOnlyFlag == true ) {
              if (products[prodCount].status == ProductStatus.ACTIVE) {
                productIds[tmpCount] = products[prodCount].productId;
                tmpCount++;
              }
            } else {
              productIds[tmpCount] = products[prodCount].productId;
              tmpCount++;
            }

        }
      }

      return productIds;
    }


    /*
    * For a given product identifier of the store, this method will return the product details.
    */
    function getProductDetails(uint _productId) public view returns(string, string, uint, uint, ProductStatus, uint256 ) {
        uint productIndex = _productId - 1;

        return ( products[productIndex].productName,
                 products[productIndex].description,
                 products[productIndex].price,
                 products[productIndex].quantity,
                 products[productIndex].status,
                 products[productIndex].discountPercentage );
    }

    /**
     * The shopper can buy this product using this function.
     *   // owner.transfer( weiToTransfer );
       // address(this).transfer( msg.value );
       // owner.transfer( msg.value );
    */
    function buyProductFromStore(uint _productId, uint _quantity) public payable returns (bool){
        uint productIndex = _productId - 1;
        uint256 weiToTransfer = _quantity * products[productIndex].price;

        require( products[productIndex].status == ProductStatus.ACTIVE, "Only the active product can be bought!");
        require( owner != msg.sender, "The owner cannot buy its own product!");
        require( _quantity <= products[productIndex].quantity, "The store does not have sufficient quantity of the product");
        require( msg.value <= msg.sender.balance, "The buyer does not have sufficient balance in his / her account!");
        // require( msg.value == weiToTransfer, "The supplied value is lesser than the actual price of the items!");

        //Reduce the corresponding quantity from the inventory
        products[productIndex].quantity = products[productIndex].quantity - _quantity;

        emit PurchaseOfProduct(_productId, _quantity, address(this), owner, msg.sender, msg.sender.balance, weiToTransfer);

        // Redeem tokens by transferring the equivalent amount of tokens to the store owners
        uint256 discountValue = 0;

        if (eip20Token.balanceOf(msg.sender) > 0) {
          uint256 tokenValue = eip20Token.balanceOf(msg.sender) * tokenPriceInWei;

          if ( tokenValue <= weiToTransfer ) {
            // Transfer all the tokens of the shopper to the store owner and
            // set the discounted value to be same as the token values
            discountValue = tokenValue;
            eip20Token.transferFrom( msg.sender, owner, eip20Token.balanceOf(msg.sender) );
          } else {
            discountValue = weiToTransfer;
            eip20Token.transferFrom( msg.sender, owner, weiToTransfer.div(tokenPriceInWei) );
          }
        }

        // Transfer fund from the shopper's acount into the store's account
        uint256 finalAmountToBePaid = weiToTransfer.sub(discountValue);
        if ( finalAmountToBePaid > 0 ) {
          address myAddress = address(this);
        //  myAddress.transfer( finalAmountToBePaid );
        }

        // Transfer loyalty tokens to the shoppers
        if ( products[productIndex].discountPercentage > 0 ) {
          eip20Token.transferFrom( owner,
                                   msg.sender,
                                   (weiToTransfer * products[productIndex].discountPercentage) / (tokenPriceInWei * 100)
                                 );
        }


        return true;
    }

    /**
     * A store owner can withdraw fund from a given store
     *
     * BP1: Fail early and fail loud
     *  - Fail early and fail loud pattern has been used to ensure that zero amount withdrwal doesn't take place.
    */
    function withdrawFund(uint withdrawAmount) public payable onlyOwner returns(bool) {
        require(withdrawAmount > 0, "The withdrwal amount must be a positive number!");
        require(address(this).balance >= withdrawAmount, "The current store balance amount must be greater than the withdrawal amount!");
        owner.transfer(withdrawAmount);

        return true;
    }

    /**
    * Return the balance owned by this store
    */
    function getBalanceOfStore() constant public returns(uint){
        return address(this).balance;
    }

}
