#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Product {
    char id[50];
    char name[100];
    char description[200];
    float price;
    struct Product *next;
};

struct Product* create_product(const char *id, const char *name, const char *description, float price) {
    struct Product *new_product = (struct Product *)malloc(sizeof(struct Product));
    if (!new_product) {
        printf("Failed to allocate memory.\n");
        return NULL;
    }

    strcpy(new_product->id, id);
    strcpy(new_product->name, name);
    strcpy(new_product->description, description);
    new_product->price = price;
    new_product->next = NULL;

    return new_product;
}

void add_product(struct Product **head, const char *id, const char *name, const char *description, float price) {
    struct Product *new_product = create_product(id, name, description, price);
    if (!new_product) return;

    new_product->next = *head;
    *head = new_product;
    printf("Product %s added successfully.\n", name);
}

struct Product* find_product(struct Product *head, const char *id) {
    struct Product *current = head;
    while (current != NULL) {
        if (strcmp(current->id, id) == 0) {
            return current;
        }
        current = current->next;
    }
    return NULL;
}

void update_product(struct Product *head, const char *id, const char *name, const char *description, float price) {
    struct Product *product = find_product(head, id);
    if (product) {
        if (name[0] != '\0') strcpy(product->name, name);
        if (description[0] != '\0') strcpy(product->description, description);
        if (price >= 0) product->price = price;
        printf("Product %s updated.\n", id);
    } else {
        printf("Product not found.\n");
    }
}

void display_product(struct Product *product) {
    if (product) {
        printf("ID: %s\n", product->id);
        printf("Name: %s\n", product->name);
        printf("Description: %s\n", product->description);
        printf("Price: $%.2f\n", product->price);
    } else {
        printf("Product not found.\n");
    }
}

void read_input(char *buffer, int size) {
    fgets(buffer, size, stdin);
    buffer[strcspn(buffer, "\n")] = 0;
}

int main() {
    struct Product *head = NULL;
    int choice;
    char id[50], name[100], description[200];
    float price;

    while (1) {
        printf("\nProduct Management System\n");
        printf("1. Add Product\n");
        printf("2. Find Product\n");
        printf("3. Update Product\n");
        printf("4. Show Product\n");
        printf("5. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);
        getchar(); 

        switch (choice) {
            case 1:
                printf("Enter Product ID: ");
                read_input(id, sizeof(id));
                printf("Enter Product Name: ");
                read_input(name, sizeof(name));
                printf("Enter Product Description: ");
                read_input(description, sizeof(description));
                printf("Enter Product Price: ");
                scanf("%f", &price);
                getchar();
                add_product(&head, id, name, description, price);
                break;

            case 2:
                printf("Enter Product ID to find: ");
                read_input(id, sizeof(id));
                {
                    struct Product *product = find_product(head, id);
                    display_product(product);
                }
                break;

            case 3:
                printf("Enter Product ID to update: ");
                read_input(id, sizeof(id));
                printf("Enter new Product Name (leave blank to skip): ");
                read_input(name, sizeof(name));
                printf("Enter new Product Description (leave blank to skip): ");
                read_input(description, sizeof(description));
                printf("Enter new Product Price (or enter -1 to skip): ");
                scanf("%f", &price);
                getchar();
                update_product(head, id, name, description, price);
                break;

            case 4:
                printf("Enter Product ID to show: ");
                read_input(id, sizeof(id));
                {
                    struct Product *product = find_product(head, id);
                    display_product(product);
                }
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

