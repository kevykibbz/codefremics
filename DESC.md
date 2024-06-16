# CodeFremics Technical Interview.

## Task on Web Application

### Task 1: Add Authentication Function with Login and Logout

#### Overview
This task involves creating a login page that requires an email and password for authentication. Appropriate error messages should be displayed where necessary. A "LOGIN" button should be provided on the login page, which, when clicked, sends the provided email and password to the specified API endpoint to generate an access token.

#### Steps

###### 1. Create a Login Page
- **Email and Password Fields**: Create input fields for the user to enter their email and password.
- **Error Messages**: Display appropriate error messages if the input is invalid or if authentication fails.
- **LOGIN Button**: Add a button labeled "LOGIN" that will trigger the login process.

##### 2. Implement the Login Functionality
- **API Endpoint**: Use the following API endpoint to authenticate the user:
    https://stemprotocol.codefremics.com/api/v2/users/login

- **HTTP Method**: `POST`
- **API Body Parameters**:

```json
{
  "username": "admin2@gmail.com",
  "password": "123456"
}


{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxNzQxMzk1NiwianRpIjoiNjU0NDQ2ODgtODQzMC00MDc2LTlkNjItYTU1OWVlZjk5NmY0IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJfaWQiOiJVMDAwMDAwMDAwMDAxIiwiX3R5cGUiOjEsIl9jaGFubmVsIjoid2ViIn0sIm5iZiI6MTcxNzQxMzk1NiwiZXhwIjoxNzE3NDE0ODU2fQ.LDr-JtQ37OfzOZ2lqH5sIFC3BE6JFRgFgoUaYkMO6nI",
  "currency": "XAF",
  "firstName": "Doctor",
  "id": "U000000000001",
  "lastName": "James",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxNzQxMzk1NiwianRpIjoiYzQzNGMzZTItMTliNi00MWY5LTk2MjMtMzFjYjEzNmU2ZTMyIiwidHlwZSI6InJlZnJlc2giLCJzdWIiOnsiX2lkIjoiVTAwMDAwMDAwMDAwMSIsIl90eXBlIjoxLCJfY2hhbm5lbCI6IndlYiJ9LCJuYmYiOjE3MTc0MTM5NTYsImV4cCI6MTcyMDAwNTk1Nn0.errIZOdVAwRDQDHLbITw6UP8L9pw5IG5zZAE1UTy4Y",
  "status": 200,
  "type": 1
}

```


```javascript
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast, { Toaster } from "react-hot-toast";
import { setUser } from "@/reducers/userReducer";
import { setTokensInCookies } from "@/utils/cookie";
import axios from "axios";

interface loadingData {
  isLoading: boolean;
}

// Define a Zod schema for form validation
const FormSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

type FormData = z.infer<typeof FormSchema>;

 const router = useRouter();
  const dispatch=useDispatch()
  const [loading, setLoading] = useState<loadingData>({ isLoading: false });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading({ isLoading: true });

    try {
      const response = await fetch(
        "https://stemprotocol.codefremics.com/api/v2/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: data.email,
            password: data.password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const authdata = await response.json();
      if (authdata.status == 404) {
        toast.error(authdata.description);
        return;
      }
      
      const {access_token,refresh_token,status,type,...userData}=authdata
      setTokensInCookies(access_token,refresh_token)
      dispatch(setUser({...userData,rememberMe:data.rememberMe,isAuthenticated:true}));

      // Redirect to the dashboard
      router.push("/dashboard");

      toast.success("Login successful!");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading({ isLoading: false });
    }
  };

```

Screenshot

![Login Page](./codefremics/login.png)


### Task 2: Create a Customer

#### Overview
This task involves creating a form on the web application to create a new customer profile. The form should include fields for first name, other names, gender, mobile number, email, and description. Validation checks must be implemented to ensure data integrity, such as verifying the email address format.

#### Steps

##### 1. Create the Customer Form
- **Input Fields**:
  - First Name
  - Other Names
  - Gender
  - Mobile Number
  - Email
  - Description

- **Validation Checks**:
  - Ensure the email field accepts a valid email address.
  - Ensure that all required fields are filled out.

##### 2. Implement the Form Submission
- **API Endpoint**: Use the following API endpoint to create a customer profile:
    https://stemprotocol.codefremics.com/api/v2/customers/create

- **HTTP Method**: `POST`
- **API Body Parameters**:
```json
{
  "first_name": "Jameson",
  "other_names": "Harera",
  "gender": "Male",
  "mobile_number": "0722522538",
  "email": "jharera@gmail.com",
  "description": "New customer profile creation"
}
```

##### Expected Output
```json
{
  "description": "Merchant customer record was created successfully but customer was not added to the default group!",
  "status": 200
}
```

##### Code Implementation

```javascript
import { getAccessTokenFromCookies } from "@/utils/cookie";
import axios from "axios";
import React, { ReactNode, useEffect, useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";


interface loadingData {
  isLoading: boolean;
}

interface UserFormData {
  firstName: string;
  otherNames: string;
  email: string;
  gender: string;
  mobileNumber: string;
  description: string;
}

type Errors = {
  [key: string]: string;
};

const [loading, setLoading] = useState<loadingData>({ isLoading: false });

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading({ isLoading: true });
    try {
      const accessToken = getAccessTokenFromCookies();
      const myData = {
        first_name: formData.firstName,
        other_names: formData.otherNames,
        gender: formData.gender,
        mobile_number: formData.mobileNumber,
        email: formData.email,
        description: formData.description,
      };

      const response = await axios.post(
        "https://stemprotocol.codefremics.com/api/v2/customers/create",
        myData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      formRef.current?.reset();
      console.log("Customer created successfully:", response.data);
      toast.success(response.data.description);

      // Optionally, reset the form or navigate to another page
    } catch (error: any) {
      console.error("Error creating customer:", error.response?.data.msg);
      toast.error(`Error creating customer:${error.response?.data.msg}`);
    } finally {
      setLoading({ isLoading: false });
    }
  };
```

Screenshot

![Creating Customer ](./codefremics/creating%20customer.png)


### Task 3. Display a List of Customers your Created.
#### Create a Data Table to Display Customer List

#### Overview
This task involves creating a data table on the web application to display a list of customers. The table should include a search function that allows users to search by first name, other name, mobile number, and email address. 

#### Steps

##### 1. Create the Data Table
- **Table Columns**:
  - Customer ID
  - First Name
  - Other Names
  - Gender
  - Mobile Number
  - Email
  - Description
  - Status

##### 2. Implement the Search Function
- **Search Fields**:
  - First Name
  - Other Name
  - Mobile Number
  - Email Address

##### 3. Fetch Customer Data
- **API Endpoint**:
    https://stemprotocol.codefremics.com/api/v2/customers/get-merchant-customers/1

- **HTTP Method**: `GET`

##### 4. Handle API Response
- **Expected Output**:
```json
{
  "description": "Merchant list of customers was fetched successfully!",
  "response": [
    {
      "customer_id": "C000000000001",
      "description": "New customer profile creation",
      "email": "jharera@gmail.com",
      "first_name": "Jameson",
      "gender": "Male",
      "number": 1,
      "other_names": "Harera",
      "status": 1
    }
  ],
  "status": 200
}
```

##### Code Implementation

```javascript
import React, { ReactNode, useEffect, useState, useRef } from "react";
import { getAccessTokenFromCookies } from "@/utils/cookie";
import axios from 'axios'


interface Customer {
  customer_id: string;
  first_name: string;
  other_names: string;
  gender: string;
  email: string;
  mobile_number: string;
}

const [loading, setLoading] = useState<boolean>(false);
const [customers, setCustomers] = useState<Customer[]>([]);

useEffect(() => {
    const fetchCustomers = async () => {
      settLoading(true)
      try {
        const accessToken = getAccessTokenFromCookies();
        const response = await axios.get(
          "https://stemprotocol.codefremics.com/api/v2/customers/get-merchant-customers/1",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setCustomers(response?.data?.response || []);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }finally{
        settLoading(false)
      }
    };

    fetchCustomers();
  }, []);
```
#### Search Function

```javascript

const [searchQuery, setSearchQuery] = useState<string>("");
const [page, setPage] = useState(0);

const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0); 
  };

  const filteredCustomers = customers.filter((customer) => {
    const { first_name, other_names, customer_id, email } = customer;
    const query = searchQuery.toLowerCase();
  
    return (
      (first_name && first_name.toLowerCase().includes(query)) ||
      (other_names && other_names.toLowerCase().includes(query)) ||
      (customer_id && customer_id.toLowerCase().includes(query)) ||
      (email && email.toLowerCase().includes(query))
    );
  });
```


Screenshot

![Listing Customer ](./codefremics/customers.png)

### Task 4: Display Profile Details of a Customer

#### Overview
This task involves displaying the profile details of a customer when a row in the customer data table is clicked. The selected customer's details will be fetched using their `customer_id` and displayed on a separate profile page. This ensures that specific details of each customer can be viewed individually.

#### Steps

##### 1. Capture Click Event on Data Table Row
- **Event Listener**: Add an event listener to each row in the customer data table to capture the click event.

##### 2. Redirect to Customer Profile Page
- **Customer ID**: Extract the `customer_id` from the clicked row and use it to redirect the user to a customer profile page.

##### 3. Fetch Customer Details
- **API Endpoint**: Use the following API endpoint to fetch customer details:
    https://stemprotocol.codefremics.com/api/v2/customers/get-customer-details/C000000000001

- **HTTP Method**: `GET`

### 4. Display Customer Details
- **Customer Profile Page**: On this page, display the following details:
- Customer First Name
- Customer Other Names
- Customer Mobile Number
- Customer Gender
- Customer Email Address

### 5. Handle API Response

- **Expected Output**:

```json
{
  "description": "Customer record was fetched successfully!",
  "response": {
    "description": "New customer profile creation",
    "email": "jharera@gmail.com",
    "first_name": "Jameson",
    "gender": "Male",
    "mobile": "0722522538",
    "other_names": "Harera",
    "status": 1
  },
  "status": 200
}
```
#### 5. Handle API Response

- **Expected Output**:

```json
{
  "description": "Customer record was fetched successfully!",
  "response": {
    "description": "New customer profile creation",
    "email": "jharera@gmail.com",
    "first_name": "Jameson",
    "gender": "Male",
    "mobile": "0722522538",
    "other_names": "Harera",
    "status": 1
  },
  "status": 200
}
```
##### Code Implementation

```javascript
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAccessTokenFromCookies } from "@/utils/cookie";

type CustomerDetails = {
  customer_id: string;
  first_name: string;
  other_names: string;
  email: string;
  description: string;
  gender: string;
  mobile: string;
};

const [customer, setCustomer] = useState<CustomerDetails | null>(null);

useEffect(() => {
    const fetchCustomerData = async () => {
      const accessToken = getAccessTokenFromCookies();

      try {
        const response = await axios.get(
          `https://stemprotocol.codefremics.com/api/v2/customers/get-customer-details/${customerId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.headers["content-type"].includes("application/json")) {
          setCustomer(response.data?.response);
        } else {
          console.error("Response was not JSON:", response);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    if (customerId) {
      fetchCustomerData();
    }
  }, [customerId]);

```

Screenshot

![Listing Customer  Details](./codefremics/customer%20details.png)

### Conclusion

The tasks outlined in this project guide developers through the creation of essential features for a web application, including user authentication, customer creation, data table implementation with search functionality, and displaying detailed customer profiles. By implementing these features, the application will offer a robust and user-friendly experience, allowing for secure access, efficient customer management, and easy retrieval of customer information. This ensures that the application meets the needs of its users effectively and efficiently.

## Task on Mobile Application

### Task 1: Design a Login Page using Flutter

## Objective
Create a login page that accepts an email address and password, authenticates the user, and displays appropriate error messages when authentication fails.

## Implementation

### Step 1: Setup Flutter Project
Ensure you have Flutter installed on your machine. If not, follow the instructions on the [Flutter official website](https://flutter.dev/docs/get-started/install) to set up Flutter.

Create a new Flutter project:
```sh
flutter create egamlio
cd egamlio
```


Screenshots

![Onboarding 1](./codefremics/app/onboarding1.png)

![Onboarding 2](./codefremics/app/onboarding2.png)

![Onboarding 3](./codefremics/app/onboarding3.png)

![Onboarding 4](./codefremics/app/onboarding4.png)

![Login Page](./codefremics/app/login.png)

![Login Page With errors](./codefremics/app/login2.png)

![Login Page Without errors](./codefremics/app/login3.png)

![Sign Up](./codefremics/app/signup.png)


# Task 2: Design a Customer Home Page

## Objective
Create a customer home page that displays customer details when a user logs into the application.

## Implementation

### Step 1: Setup Customer Details Model

Create a model class `user_details.dart` to represent customer details.

```dart
class UserDetails {
  final String firstName;
  final String email;
  final String gender;
  final String mobile;
  final String otherNames;

  UserDetails({
    required this.firstName,
    required this.email,
    required this.gender,
    required this.mobile,
    required this.otherNames,
  });

  factory UserDetails.fromJson(Map<String, dynamic> json) {
    return UserDetails(
      firstName: json['response']['first_name'] ?? "Kevin",
      email: json['response']['email'] ?? "Kibebekevin@gmail.com",
      gender: json['response']['gender'] ?? "Male",
      mobile: json['response']['mobile'] ?? "0796268817",
      otherNames: json['response']['other_names'] ?? "Kibebe",
    );
  }
}
```

Screenshot

![Customer Details Token Expired](./codefremics/app/dashboard1.png)

![Customer Details Token Active](./codefremics/app/dashboard2.png)


# Task 3: Add Logout Function on the Mobile Application

## Objective
Implemented a logout function that redirects the customer to the login page upon logging out.

## Implementation

### Step 1: Add Logout Button to Home Page

Modified the `home_page.dart` to include a logout button in the app bar.

```dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'user_details.dart';
import 'fetch_user_details.dart';
import 'login_page.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xff6269d8),
        title: const Text(
          'Customer Details',
          style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              _logout(context);
            },
          ),
        ],
      ),
      body: FutureBuilder<UserDetails>(
        future: fetchUserDetails(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (snapshot.hasData) {
            final userDetails = snapshot.data!;
            return Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildTextField('Full Name', userDetails.firstName, Icons.person_outline),
                  _buildTextField('Email', userDetails.email, Icons.email_outlined),
                  _buildTextField('Gender', userDetails.gender, userDetails.gender.toLowerCase() == 'male' ? Icons.male : Icons.female),
                  _buildTextField('Phone Number', userDetails.mobile, Icons.phone_android_outlined),
                  _buildTextField('Other Name(s)', userDetails.otherNames, Icons.person_outline),
                ],
              ),
            );
          } else {
            return const Center(child: Text('No data found'));
          }
        },
      ),
    );
  }

  Widget _buildTextField(String label, String value, IconData iconData) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        children: [
          Icon(iconData, color: const Color(0xff6269d8)),
          const SizedBox(width: 10),
          Text('$label: $value', style: const TextStyle(fontSize: 16)),
        ],
      ),
    );
  }

  void _logout(BuildContext context) {
    Get.offAll(() => LoginPage());
  }
}
```

Screenshot

![Logout Button](./codefremics/app/logout.png)

# Task 4: List Customers

## Objective
Added a button on the home screen that redirects to a customer list page. This page should display the customer first name and email address below the customer first name.

## Implementation

### Step 1: Add a Button to Home Screen

Modify the `home_page.dart` to include a button that navigates to the customers list page.

```dart
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;

class Customer {
  final String firstName;
  final String email;

  Customer({
    required this.firstName,
    required this.email,
  });

  factory Customer.fromJson(Map<String, dynamic> json) {
    return Customer(
      firstName: json['first_name'] ?? "",
      email: json['email'] ?? "",
    );
  }
}

class CustomersPage extends StatelessWidget {
  final controller = Get.put(CustomersController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xff6269d8),
        title: const Text(
          'Customers List',
          style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
          ),
        ),
         leading: IconButton(
          icon: const Icon(Icons.arrow_back,color: Colors.white,),
          onPressed: () {
            Get.back(); // Navigate back to previous screen using GetX
          },
        ),
      ),
      body: Obx(
        () => controller.isLoading.value
            ? const Center(child: CircularProgressIndicator())
            : ListView.builder(
                itemCount: controller.customers.length,
                itemBuilder: (context, index) {
                  final customer = controller.customers[index];
                  return ListTile(
                    title: Text(customer.firstName),
                    subtitle: Text(customer.email),
                    leading: CircleAvatar(
                      child: Text(customer.firstName[0]),
                    ),
                  );
                },
              ),
      ),
    );
  }
}
```
Screenshot

![Customer list](./codefremics/app/customerlist.png)