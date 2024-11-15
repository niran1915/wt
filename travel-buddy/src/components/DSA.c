#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TABLE_SIZE 100
#define MAX_NAME_LENGTH 50

// Define structures
typedef struct Customer {
    int id;
    char name[MAX_NAME_LENGTH];
} Customer;

typedef struct Item {
    int id;
    char name[MAX_NAME_LENGTH];
    char category[MAX_NAME_LENGTH];
    double price;
} Item;

typedef struct Node {
    int item_id;
    struct Node *next;
} Node;

typedef struct UserActivity {
    int customer_id;
    Node *browsing_head;
    Node *purchase_head;
} UserActivity;

typedef struct CustomerHashEntry {
    Customer customer;
    struct CustomerHashEntry *next;
} CustomerHashEntry;

typedef struct ItemHashEntry {
    Item item;
    struct ItemHashEntry *next;
} ItemHashEntry;

// Global hash tables and user activities
CustomerHashEntry *customer_table[TABLE_SIZE];
ItemHashEntry *item_table[TABLE_SIZE];
UserActivity user_activity[TABLE_SIZE]; // Corrected this line

// Hash function
int hash_function(int id) {
    return id % TABLE_SIZE;
}

// Customer Management Functions
void add_customer(int id, const char *name) {
    int index = hash_function(id);
    CustomerHashEntry *new_entry = (CustomerHashEntry *)malloc(sizeof(CustomerHashEntry));
    new_entry->customer.id = id;
    strncpy(new_entry->customer.name, name, MAX_NAME_LENGTH);
    new_entry->next = customer_table[index];
    customer_table[index] = new_entry;

    user_activity[index].customer_id = id; // Corrected this line
    user_activity[index].browsing_head = NULL;
    user_activity[index].purchase_head = NULL;

    printf("** Customer %s added successfully.\n", name);
}

Customer *get_customer(int id) {
    int index = hash_function(id);
    CustomerHashEntry *entry = customer_table[index];
    while (entry) {
        if (entry->customer.id == id) {
            return &entry->customer;
        }
        entry = entry->next;
    }
    return NULL;
}

// Item Management Functions
void add_item(int id, const char *name, const char *category, double price) {
    int index = hash_function(id);
    ItemHashEntry *new_entry = (ItemHashEntry *)malloc(sizeof(ItemHashEntry));
    new_entry->item.id = id;
    strncpy(new_entry->item.name, name, MAX_NAME_LENGTH);
    strncpy(new_entry->item.category, category, MAX_NAME_LENGTH);
    new_entry->item.price = price;
    new_entry->next = item_table[index];
    item_table[index] = new_entry;

    printf("** Item %s added successfully.\n", name);
}

Item *get_item(int id) {
    int index = hash_function(id);
    ItemHashEntry *entry = item_table[index];
    while (entry) {
        if (entry->item.id == id) {
            return &entry->item;
        }
        entry = entry->next;
    }
    return NULL;
}

// Browsing and Purchase History Functions
void add_activity(int customer_id, int item_id, int is_purchase) {
    int index = hash_function(customer_id);
    Node **head = is_purchase ? &user_activity[index].purchase_head : &user_activity[index].browsing_head;
    Node *new_node = (Node *)malloc(sizeof(Node));
    new_node->item_id = item_id;
    new_node->next = *head;
    *head = new_node;

    printf("** %s activity updated for Customer %d with Item ID %d.\n",
           is_purchase ? "Purchase" : "Browsing", customer_id, item_id);
}

void display_activity(int customer_id, int is_purchase) {
    int index = hash_function(customer_id);
    Node *current = is_purchase ? user_activity[index].purchase_head : user_activity[index].browsing_head;
    if (!current) {
        printf("** No %s activity found for Customer %d.\n",
               is_purchase ? "purchase" : "browsing", customer_id);
        return;
    }
    printf("** %s Activity for Customer %d:\n", is_purchase ? "Purchase" : "Browsing", customer_id);
    while (current) {
        Item *item = get_item(current->item_id);
        if (item) {
            printf("** Item ID: %d, Name: %s, Category: %s, Price: %.2f\n",
                   item->id, item->name, item->category, item->price);
        }
        current = current->next;
    }
}

// Recommendation Engine
void generate_suggestions(int customer_id) {
    int index = hash_function(customer_id);
    Node *current = user_activity[index].browsing_head;

    printf("** Suggestions for Customer %d based on browsing history:\n", customer_id);
    while (current) {
        Item *item = get_item(current->item_id);
        if (item) {
            printf("** - Item Name: %s (Category: %s, Price: %.2f)\n",
                   item->name, item->category, item->price);
        }
        current = current->next;
    }
}

// Purchase Item Function
void purchase_item(int customer_id, int item_id) {
    Item *item = get_item(item_id);
    if (!item) {
        printf("** Item not found.\n");
        return;
    }
    add_activity(customer_id, item_id, 1);  // Add to purchase activity
    printf("** You purchased %s for $%.2f.\n", item->name, item->price);

    // Trigger suggestions
    printf("\n** Recommended items for you:\n");
    generate_suggestions(customer_id);
}

// Main Function
int main() {
    // Initialize the hash tables
    for (int i = 0; i < TABLE_SIZE; i++) {
        customer_table[i] = NULL;
        item_table[i] = NULL;
        user_activity[i].browsing_head = NULL;
        user_activity[i].purchase_head = NULL;
    }

    int choice;
    while (1) {
        printf("\n** Menu:\n");
        printf("1. Add Customer\n");
        printf("2. Add Item\n");
        printf("3. Search Item\n");
        printf("4. Record Browsing Activity\n");
        printf("5. Purchase Item\n");
        printf("6. View Browsing Activity\n");
        printf("7. View Purchase Activity\n");
        printf("8. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1: {
                int customer_id;
                char name[MAX_NAME_LENGTH];
                printf("Enter Customer ID: ");
                scanf("%d", &customer_id);
                printf("Enter Customer Name: ");
                scanf("%s", name);
                add_customer(customer_id, name);
                break;
            }
            case 2: {
                int item_id;
                char name[MAX_NAME_LENGTH], category[MAX_NAME_LENGTH];
                double price;
                printf("Enter Item ID: ");
                scanf("%d", &item_id);
                printf("Enter Item Name: ");
                scanf("%s", name);
                printf("Enter Item Category: ");
                scanf("%s", category);
                printf("Enter Item Price: ");
                scanf("%lf", &price);
                add_item(item_id, name, category, price);
                break;
            }
            case 3: {
                int item_id;
                printf("Enter Item ID: ");
                scanf("%d", &item_id);
                Item *item = get_item(item_id);
                if (item) {
                    printf("** Item ID: %d, Name: %s, Category: %s, Price: %.2f\n",
                           item->id, item->name, item->category, item->price);
                } else {
                    printf("** Item not found.\n");
                }
                break;
            }
            case 4: {
                int customer_id, item_id;
                printf("Enter Customer ID: ");
                scanf("%d", &customer_id);
                printf("Enter Item ID: ");
                scanf("%d", &item_id);
                add_activity(customer_id, item_id, 0);
                break;
            }
            case 5: {
                int customer_id, item_id;
                printf("Enter Customer ID: ");
                scanf("%d", &customer_id);
                printf("Enter Item ID: ");
                scanf("%d", &item_id);
                purchase_item(customer_id, item_id);
                break;
            }
            case 6: {
                int customer_id;
                printf("Enter Customer ID: ");
                scanf("%d", &customer_id);
                display_activity(customer_id, 0);
                break;
            }
            case 7: {
                int customer_id;
                printf("Enter Customer ID: ");
                scanf("%d", &customer_id);
                display_activity(customer_id, 1);
                break;
            }
            case 8: {
                printf("** Exiting program.\n");
                return 0;
            }
            default:
                printf("** Invalid choice. Try again.\n");
        }
    }

    return 0;
}