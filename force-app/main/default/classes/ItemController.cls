public with sharing class ItemController {
    public ItemController(){}


        //Item Wrapper Class
        public class item{
            @AuraEnabled
            public String label {get; set;}
            @AuraEnabled
            public String name {get; set;}
            @AuraEnabled
            public Boolean expanded {get; set;}
            @AuraEnabled
            public List<item> items {get; set;}
             
            public item(String label, String name, Boolean expanded, List<item> items){
                this.label = label;
                this.name = name;
                this.expanded = expanded;
                this.items = items;
            }
        }


    @AuraEnabled
    public static List<Item__c> getMenuItems(){
        List<String> resultList = new List<String>();
        List<Item__c> menuItemsList = [SELECT Id, Name, Cost__c, Description__c, Portions__c, Comment__c FROM Item__c];
        return [SELECT Id, Name, Cost__c, Description__c, Portions__c, Comment__c FROM Item__c];
    }

    @AuraEnabled(cacheable=true)
    public static List<Item__c> getMenuItems2(String gId){
        return [SELECT Id, Name, Cost__c, Description__c, Portions__c, Comment__c FROM Item__c WHERE Group__r.Id=:gId];
    }


    @AuraEnabled(cacheable=true)
    public static List<Item__c> getMenuItemsById(String gId){
        List<Item__c> menuItemsList = new List<Item__c>();
        System.debug('1*' + gId + '*1' );
        if (gId != ' ') {
            List<String> resultList = new List<String>();
        menuItemsList = [SELECT Id, Name, Cost__c, Description__c, Portions__c, Comment__c FROM Item__c WHERE Group__r.Id=:gId ];
       // System.debug(' ' + gId + ' ' + JSON.serializePretty(menuItemsList));

        } else {
            menuItemsList = [SELECT Id, Name, Cost__c, Description__c, Portions__c, Comment__c FROM Item__c];
        }

        return menuItemsList;   
    }


    @AuraEnabled
    public static List<MainGroup__c> getMainGroups(){
        List<MainGroup__c> mgL = new List<MainGroup__c>();
        mgL = [SELECT Id, Name FROM MainGroup__c];
        return mgL;
    }

    @AuraEnabled
    public static List<Group__c> getGroups(){
        List<Group__c> g = new List<Group__c> ();
        g = [SELECT Id, Name FROM Group__c];
        return g;
    }

    @AuraEnabled(cacheable=true)
    public static List<item> getItemsTree(){
        System.debug(' hi hello ');
        List<item> items = new List<item>();
        List<MainGroup__c> gList = new List<MainGroup__c>();
        //get list of accounts and respective contacts
        gList = [SELECT Id, Name, (SELECT Id, Name From Groups__r) From MainGroup__c];
        for(MainGroup__c g: gList){
             
            //get contacts of current account record
            List<item> gitems = new List<item>();
            for(Group__c c: g.Groups__r){
                //add contact items
                item gitem = new item(c.Name, String.valueOf(c.Id), false, null);
                gitems.add(gitem);
            }
             
            //add account items
            item mgitem = new item(g.Name, String.valueOf(g.Id), false, gitems);
            items.add(mgitem);
            System.debug(' ' + mgitem);
        }
        System.debug(' items TREE ' + JSON.serializePretty(items));
       // String str = JSON.serializePretty(items);
       // str = str.replace('\"name\"', 'name');
       // str = str.replace('\"label\"', 'label');
       // str = str.replace('\"items\"', 'items');
       // str = str.replace('\"expanded\"', 'expanded');
        //str = str.replace('\"', '\'');
       // str = str.replace('null', '[]');
      // System.debug(' ' + str);
        return items;
    }
     
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList(){
       // System.debug(' ' + [select id, Name , Type, Rating,Phone, Website, AnnualRevenue from Account Order by Name]);
        return [select id, Name , Type, Rating,Phone, Website, AnnualRevenue from Account Order by Name];   
    }
    
}