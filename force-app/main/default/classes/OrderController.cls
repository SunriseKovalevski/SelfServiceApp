public with sharing class OrderController {
    public OrderController() {

    }

/*    @AuraEnabled
    public static List<Order__c> methodName(){
        
    }*/
    @AuraEnabled(cacheable=true)
    public static List<Group__c> getGroups(){
        return [SELECT Id, Name 
                FROM Group__c
                WITH SECURITY_ENFORCED];
    }

    @AuraEnabled
    public static Id insertOrder(){
        Order__c order = new Order__c();
        try {
            insert order;
            return order.Id;
        } catch (DmlException e) {
            return '0';
        }
    }

    @AuraEnabled
    public static Id insertOrderItem(
                                    Id orderId, 
                                    String name,
                                    String comment,
                                    Integer portions,
                                    Integer cost,
                                    String description,
                                    Integer num){
                                        
        OrderItem__c orderItem = new OrderItem__c(
            Order__c = orderId,
            Comment__c = comment,
            Cost__c = cost,
            Description__c = description,
            Num__c = num,
            Name = name,
            Portions__c = portions
        );
        insert orderItem;
        return orderItem.Id;

        
    }

   /* @AuraEnabled
    public static List<OrderItem__c> getOrderItemsById(Id ){
        
    }*/



}
