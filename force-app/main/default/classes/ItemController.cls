public with sharing class ItemController {


    @AuraEnabled
    public static List<Item__c> getMenuItems(){

        List<String> resultList = new List<String>();
        List<Item__c> menuItemsList = [SELECT Id, Name, Cost__c, Description__c, Portions__c, Comment__c FROM Item__c];

        return menuItemsList;
    }
    
}
