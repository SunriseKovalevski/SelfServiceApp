public with sharing class dsiplaycases {
    @AuraEnabled
       public static Integer TotalRecords(){
           return [Select count() from Item__c];
       }
       @AuraEnabled(cacheable=true)
       public static List<Item__c> getCaseList(Integer v_Offset, Integer v_pagesize){ 
           return [select Id, Name, Cost__c, Description__c, Portions__c, Comment__c from Item__c limit :v_pagesize OFFSET :v_Offset];
       }

       @AuraEnabled(cacheable=true)
       public static Integer getNext(Integer v_Offset, Integer v_pagesize){
           v_Offset += v_pagesize;
           return v_Offset;
       }

       @AuraEnabled(cacheable=true)
       public static Integer getPrevious(Integer v_Offset, Integer v_pagesize){
           v_Offset -= v_pagesize;
           return v_Offset;
       }
}
