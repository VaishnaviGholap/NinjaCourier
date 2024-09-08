//package com.NinjaCourier.model;
//
//import org.antlr.v4.runtime.misc.NotNull;
//import org.hibernate.annotations.BatchSize;
//
//import com.fasterxml.jackson.annotation.JsonProperty;
//
//import jakarta.persistence.*;
//import jakarta.validation.constraints.Email;
//import jakarta.validation.constraints.NotBlank;
//import jakarta.validation.constraints.Pattern;
//import jakarta.validation.constraints.Size;
//
//@Entity
//@Table(name="admin")
//public class Admin 
//{
////	ID int primary key auto_increment,
////	Name varchar(50) not null,
////	Password varchar(50) not null, 
////	email varchar(50) not null unique,
////	Username varchar(50) not null unique
//	
//	@Id
//	@GeneratedValue(strategy= GenerationType.IDENTITY)
//	private int ID;
//	
//    @NotBlank(message ="Name field is mandtory")
//	@JsonProperty("Name")							// we use so that we wnter data in json should be according to this column but it is not having much effect
//	@Size(max = 30,message="Name should be less than 30 characters")
//	@Column(nullable = false)
//	private String Name;
//	
//	
//	@JsonProperty("Password")
//	@Size(max=15 , message = "Password fields be less than 15 characters")
//	@Column(nullable= false)
//	private String Password;
//	
//	@NotBlank(message="email is mandatory")
//	@JsonProperty("Email")
//	@Email(message="Enter proper email address")
//	@Column(nullable = false)
//	private String Email;
//	
//	@NotBlank(message="Username is mandatory")
//	@JsonProperty("Username")
//	@Size(max=10,message="usename should be lessthan 10 characters")
//	@Column(nullable= false)
//	private String Username;
//	
//	public Admin() {};
//
//	public Admin(int ID, String Name, String Password, String Email, String Username) {
//		super();
//		ID = ID;
//		this.Name = Name;
//		Password = Password;
//		this.Email = Email;
//		this.Username = Username;
//	}
//
//	public int getID() {
//		return ID;
//	}
//
//	public void setID(int iD) {
//		ID = iD;
//	}
//
//	public String getName() {
//		return Name;
//	}
//
//	public void setName(String name) {
//		Name = name;
//	}
//
//	public String getPassword() {
//		return Password;
//	}
//
//	public void setPassword(String password) {
//		Password = password;
//	}
//
//	public String getEmail() {
//		return Email;
//	}
//
//	public void setEmail(String email) {
//		Email = email;
//	}
//
//	public String getUsername() {
//		return Username;
//	}
//
//	public void setUsername(String username) {
//		Username = username;
//	}
//
//	@Override
//	public String toString() {
//		return "Admin [ID=" + ID + ", Name=" + Name + ", Password=" + Password + ", Email=" + Email + ", Username="
//				+ Username + "]";
//	}
//	
//}


package com.NinjaCourier.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "admin")
public class Admin {

//	ID int primary key auto_increment,
//	Name varchar(50) not null,
//	Password varchar(50) not null, 
//	email varchar(50) not null unique,
//	Username varchar(50) not null unique
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    
    @JsonProperty("name") 								// we use so that we wnter data in json should be according to this column but it is not having much effect
    @Column(nullable = false)
    private String name;

    @JsonProperty("password")
    
    @Column(nullable = false)
    private String password;

    
    @JsonProperty("email")
   
    @Column(nullable = false)
    private String email;

    
    @JsonProperty("username")
    @Column(nullable = false)
    private String username;
    
    @JsonProperty("phoneNumber")
    @Column(nullable = false)
    private String phoneNumber;
    
   
    public Admin() {}

    

    public Admin(int id, String name, String password, String email, String username, String phoneNumber) {
		
		this.id = id;
		this.name = name;
		this.password = password;
		this.email = email;
		this.username = username;
		this.phoneNumber = phoneNumber;
	}



	// Getters and Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "Admin [id=" + id + ", name=" + name + ", password=" + password + ", email=" + email + ", username=" + username + "]";
    }
}
