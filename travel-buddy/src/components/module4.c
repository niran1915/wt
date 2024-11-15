#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_ID_LENGTH 50
#define MAX_NAME_LENGTH 100
#define MAX_HISTORY_SIZE 100

// Product Node for Binary Tree (Purchase History)
typedef struct ProductNode {
    char product_id[MAX_ID_LENGTH];
    struct ProductNode *left, *right;
} ProductNode;

// Product Node for Graph (Browsing History)
typedef struct ProductNodeGraph {
    char product_id[MAX_ID_LENGTH];
    struct ProductNodeGraph *next;
} ProductNodeGraph;

// User Structure
typedef struct User {
    char user_id[MAX_ID_LENGTH];
    char name[MAX_NAME_LENGTH];
    ProductNodeGraph *browsing_history_head;
    ProductNode *purchase_history_head;
} User;

// Hash Table to manage users
typedef struct HashTable {
    User *table[MAX_HISTORY_SIZE];  // Fixed-size hash table
} HashTable;

// Hash function for user ID
unsigned int hash(const char *user_id) {
    unsigned int hash_value = 0;
    while (*user_id) {
        hash_value = (hash_value << 5) + *user_id++;  // Shift and add hash
    }
    return hash_value % MAX_HISTORY_SIZE;
}

// Create a new user
User *create_user(const char *user_id, const char *name) {
    User *new_user = (User *)malloc(sizeof(User));
    if (!new_user) {
        printf("Memory allocation failed.\n");
        return NULL;
    }
    strcpy(new_user->user_id, user_id);
    strcpy(new_user->name, name);
    new_user->browsing_history_head = NULL;
    new_user->purchase_history_head = NULL;
    return new_user;
}

// Add user to the hash table
void add_user(HashTable *ht, const char *user_id, const char *name) {
    unsigned int index = hash(user_id);
    
    // Check if the user already exists
    if (ht->table[index] != NULL) {
        printf("User with ID %s already exists.\n", user_id);
        return;
    }

    User *new_user = create_user(user_id, name);
    ht->table[index] = new_user;
    printf("User %s added successfully.\n", name);
}

// Retrieve a user from the hash table
User *get_user(HashTable *ht, const char *user_id) {
    unsigned int index = hash(user_id);
    return ht->table[index];
}

// Add product to browsing history (Graph structure)
void add_to_browsing_history(User *user, const char *product_id) {
    ProductNodeGraph *new_node = (ProductNodeGraph *)malloc(sizeof(ProductNodeGraph));
    strcpy(new_node->product_id, product_id);
    new_node->next = user->browsing_history_head;
    user->browsing_history_head = new_node;
    printf("Product %s added to browsing history.\n", product_id);
}

// Add product to purchase history (Binary tree structure)
ProductNode *add_to_purchase_history(ProductNode *root, const char *product_id) {
    if (root == NULL) {
        ProductNode *new_node = (ProductNode *)malloc(sizeof(ProductNode));
        strcpy(new_node->product_id, product_id);
        new_node->left = new_node->right = NULL;
        return new_node;
    }

    // Insert product ID in binary tree
    if (strcmp(product_id, root->product_id) < 0) {
        root->left = add_to_purchase_history(root->left, product_id);
    } else {
        root->right = add_to_purchase_history(root->right, product_id);
    }
    return root;
}

// Display browsing history (Graph traversal)
void display_browsing_history(ProductNodeGraph *head) {
    if (head == NULL) {
        printf("No browsing history.\n");
        return;
    }
    ProductNodeGraph *temp = head;
    while (temp != NULL) {
        printf("Product ID: %s\n", temp->product_id);
        temp = temp->next;
    }
}

// In-order traversal of binary tree (Display purchase history)
void display_purchase_history(ProductNode *root) {
    if (root == NULL) {
        printf("No purchase history.\n");
        return;
    }
    display_purchase_history(root->left);
    printf("Product ID: %s\n", root->product_id);
    display_purchase_history(root->right);
}

// Recommendation Engine (Collaborative Filtering based on purchase history)
void generate_recommendations(HashTable *ht, const char *user_id) {
    User *user = get_user(ht, user_id);
    if (user == NULL) {
        printf("User not found.\n");
        return;
    }

    printf("\nRecommendations for User %s:\n", user->name);
    printf("Browsing history:\n");
    display_browsing_history(user->browsing_history_head);

    printf("\nPurchase history:\n");
    display_purchase_history(user->purchase_history_head);

    // Generate recommendations based on purchase history (example)
    printf("\nGenerating recommendations...\n");
    if (user->purchase_history_head != NULL) {
        // Example: Recommending products similar to the ones the user bought
        // This could be expanded based on real-world logic or machine learning.
        printf("Recommendations based on your purchase history:\n");
        display_purchase_history(user->purchase_history_head);
    }
}

// Main program with dynamic input
int main() {
    HashTable ht = {0};  // Initialize hash table
    int choice;
    char user_id[MAX_ID_LENGTH], product_id[MAX_ID_LENGTH], product_name[MAX_NAME_LENGTH];

    while (1) {
        printf("\n--- E-commerce Platform ---\n");
        printf("1. Add User\n");
        printf("2. Track Browsing History\n");
        printf("3. Track Purchase History\n");
        printf("4. Display Browsing History\n");
        printf("5. Display Purchase History\n");
        printf("6. Generate Recommendations\n");
        printf("7. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);
        getchar();  // Consume newline character

        switch (choice) {
            case 1:
                // Add User
                printf("Enter User ID: ");
                fgets(user_id, sizeof(user_id), stdin);
                user_id[strcspn(user_id, "\n")] = '\0';  // Remove newline
                printf("Enter User Name: ");
                fgets(product_name, sizeof(product_name), stdin);
                product_name[strcspn(product_name, "\n")] = '\0';  // Remove newline
                add_user(&ht, user_id, product_name);
                break;

            case 2:
                // Track Browsing History
                printf("Enter User ID to track browsing: ");
                fgets(user_id, sizeof(user_id), stdin);
                user_id[strcspn(user_id, "\n")] = '\0';  // Remove newline
                printf("Enter Product ID to add to browsing history: ");
                fgets(product_id, sizeof(product_id), stdin);
                product_id[strcspn(product_id, "\n")] = '\0';  // Remove newline
                {
                    User *user = get_user(&ht, user_id);
                    if (user) {
                        add_to_browsing_history(user, product_id);
                    } else {
                        printf("User not found.\n");
                    }
                }
                break;

            case 3:
                // Track Purchase History
                printf("Enter User ID to track purchase: ");
                fgets(user_id, sizeof(user_id), stdin);
                user_id[strcspn(user_id, "\n")] = '\0';  // Remove newline
                printf("Enter Product ID to add to purchase history: ");
                fgets(product_id, sizeof(product_id), stdin);
                product_id[strcspn(product_id, "\n")] = '\0';  // Remove newline
                {
                    User *user = get_user(&ht, user_id);
                    if (user) {
                        user->purchase_history_head = add_to_purchase_history(user->purchase_history_head, product_id);
                    } else {
                        printf("User not found.\n");
                    }
                }
                break;

            case 4:
                // Display Browsing History
                printf("Enter User ID to display browsing history: ");
                fgets(user_id, sizeof(user_id), stdin);
                user_id[strcspn(user_id, "\n")] = '\0';  // Remove newline
                {
                    User *user = get_user(&ht, user_id);
                    if (user) {
                        display_browsing_history(user->browsing_history_head);
                    } else {
                        printf("User not found.\n");
                    }
                }
                break;

            case 5:
                // Display Purchase History
                printf("Enter User ID to display purchase history: ");
                fgets(user_id, sizeof(user_id), stdin);
                user_id[strcspn(user_id, "\n")] = '\0';  // Remove newline
                {
                    User *user = get_user(&ht, user_id);
                    if (user) {
                        display_purchase_history(user->purchase_history_head);
                    } else {
                        printf("User not found.\n");
                    }
                }
                break;

            case 6:
                // Generate Recommendations
                printf("Enter User ID to generate recommendations: ");
                fgets(user_id, sizeof(user_id), stdin);
                user_id[strcspn(user_id, "\n")] = '\0';  // Remove newline
                generate_recommendations(&ht, user_id);
                break;

            case 7:
                printf("Exiting the platform.\n");
                return 0;

            default:
                printf("Invalid choice. Please try again.\n");
        }
    }

    return 0;
}
