#include <stdio.h>
#include <string.h>

#define MAX_USERS 5  
#define MAX_HISTORY 3  

typedef struct UserProfile {
    char user_id[50];
    char name[100];
    char email[100];
    char browsing_history[MAX_HISTORY][50];  
    int browsing_count;  
    char purchase_history[MAX_HISTORY][50];  
    int purchase_count;  
} UserProfile;

UserProfile users[MAX_USERS];
int user_count = 0;  

void create_user() {
    if (user_count >= MAX_USERS) {
        printf("User limit reached.\n");
        return;
    }

    printf("Enter User ID: ");
    scanf("%s", users[user_count].user_id);
    printf("Enter Name: ");
    scanf(" %[^\n]s", users[user_count].name);  
    printf("Enter Email: ");
    scanf("%s", users[user_count].email);
    users[user_count].browsing_count = 0;
    users[user_count].purchase_count = 0;

    user_count++;  
    printf("User created successfully.\n");
}

void display_user_info() {
    char user_id[50];
    printf("Enter User ID: ");
    scanf("%s", user_id);

    for (int i = 0; i < user_count; i++) {
        if (strcmp(users[i].user_id, user_id) == 0) {
            printf("User Info for %s:\n", users[i].user_id);
            printf("Name: %s\n", users[i].name);
            printf("Email: %s\n", users[i].email);
            printf("Browsing History: ");
            for (int j = 0; j < users[i].browsing_count; j++) {
                printf("%s ", users[i].browsing_history[j]);
            }
            printf("\nPurchase History: ");
            for (int j = 0; j < users[i].purchase_count; j++) {
                printf("%s ", users[i].purchase_history[j]);
            }
            printf("\n");
            return;
        }
    }

    printf("User not found.\n");
}

void add_to_browsing_history() {
    char user_id[50], product_id[50];
    printf("Enter User ID: ");
    scanf("%s", user_id);
    printf("Enter Product ID to add to browsing history: ");
    scanf("%s", product_id);

    for (int i = 0; i < user_count; i++) {
        if (strcmp(users[i].user_id, user_id) == 0) {
            if (users[i].browsing_count < MAX_HISTORY) {
                strcpy(users[i].browsing_history[users[i].browsing_count], product_id);
                users[i].browsing_count++;
                printf("Product added to browsing history.\n");
            } else {
                printf("Browsing history is full.\n");
            }
            return;
        }
    }

    printf("User not found.\n");
}

void add_to_purchase_history() {
    char user_id[50], product_id[50];
    printf("Enter User ID: ");
    scanf("%s", user_id);
    printf("Enter Product ID to add to purchase history: ");
    scanf("%s", product_id);

    for (int i = 0; i < user_count; i++) {
        if (strcmp(users[i].user_id, user_id) == 0) {
            if (users[i].purchase_count < MAX_HISTORY) {
                strcpy(users[i].purchase_history[users[i].purchase_count], product_id);
                users[i].purchase_count++;
                printf("Product added to purchase history.\n");
            } else {
                printf("Purchase history is full.\n");
            }
            return;
        }
    }

    printf("User not found.\n");
}

int main() {
    int choice;

    while (1) {
        printf("\n--- User Management System ---\n");
        printf("1. Create User\n");
        printf("2. Display User Information\n");
        printf("3. Add Product to Browsing History\n");
        printf("4. Add Product to Purchase History\n");
        printf("5. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                create_user();
                break;
            case 2:
                display_user_info();
                break;
            case 3:
                add_to_browsing_history();
                break;
            case 4:
                add_to_purchase_history();
                break;
            case 5:
                printf("Exiting...\n");
                return 0;
            default:
                printf("Invalid choice. Please try again.\n");
        }
    }

    return 0;
}
