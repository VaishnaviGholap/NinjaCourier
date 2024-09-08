//package com.NinjaCourier.model;
//
//import java.sql.Date;
//import com.fasterxml.jackson.annotation.JsonProperty;
//import jakarta.persistence.*;
//import jakarta.validation.constraints.*;
//
////CREATE TABLE FeedQry (
////	    FeedbackId INT PRIMARY KEY AUTO_INCREMENT,
////	    Date DATE NOT NULL,
////	    Category VARCHAR(255) NOT NULL,
////	    Ratings VARCHAR(10) NOT NULL,
////	    Query TEXT NOT NULL,
////	    Username VARCHAR(255) NOT NULL,
////	    Email VARCHAR(255) NOT NULL
////	);
////
////	-- Add constraints to ensure proper data
////	ALTER TABLE FeedQry
////	ADD CONSTRAINT chk_ratings CHECK (Ratings IN ('1', '2', '3', '4', '5'));
////
////	ALTER TABLE FeedQry
////	ADD CONSTRAINT chk_email_format CHECK (Email LIKE '%_@_%._%');
//
//@Entity
//@Table(name="FeedQry")
//public class FeedQry{
//	
//	@Id
//	@GeneratedValue(strategy=GenerationType.IDENTITY)
//	private int FeedbackID;
//	
//	//	@NotBlank(message="Date is mandatory")
//	//	We are not using NotBlank here because notblank works for string fields and not for date fields
//	//  for date fields we must use NotNull
//	  @NotNull(message="Date is mandatory")
//	  @JsonProperty("Date")
//	  @Column(nullable=false)
//	  private Date Date;
//	
//	@NotBlank(message="Category is mandatory")
//	@Size(max=15,message="Category should be less than 15 characters")
//	@JsonProperty("Category")
//	@Column(nullable = false)
//	private String Category;
//	
//	@NotBlank(message="Rating must be Provided")
//	@Pattern(regexp = "^[1-5]$", message = "Ratings should be a value between 1 and 5")
//	@JsonProperty("Ratings")
//	@Column(nullable = false)
//	private String Ratings;
//	
//	@NotBlank(message="Query is mandatory")
//	@JsonProperty("Query")
//	@Column(nullable =false,columnDefinition = "Text")
//	private String Query;
//	
//	@NotBlank(message="Username is mandatory")
//	@JsonProperty("Username")
//	@Size(max=15, message="Username Should be less than 15 Characters")
//	@Column(nullable=false)
//	private String Username;
//	
////	@Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$", message = "Enter a proper email address")
//	@NotBlank(message="Email is mandatory")
//	@JsonProperty("Email")
//	@Email(message="Enter a valid email address")
//	@Size(max=25,message="Email should be less than 25 characters")
//	@Column(nullable = false)
//	private String Email;
//
//	public FeedQry() {};
//	
//	public FeedQry(int feedbackID, 
//		java.sql.@NotBlank(message = "Date is mandatory") Date date,
//		@NotBlank(message = "Category is mandatory") @Size(max = 15, message = "Category should be less than 15 characters") String category,
//		@NotBlank(message = "Rating must be Provided") @Pattern(regexp = "^[1,2,3,4,5]$", message = "Ratings should be a value between 1 and 5") String ratings,
//		@NotBlank(message = "Query is mandatory") String query,
//		@NotBlank(message = "Username is mandatory") @Size(max = 15, message = "Username Should be less than 15 Characters") String username,
//		@NotBlank(message = "Email is mandatory") @jakarta.validation.constraints.Email(message = "Enter a valid email address") @Size(max = 25, message = "Email should be less than 25 characters") String email) {
//		super();
//		FeedbackID = feedbackID;
//		Date = date;
//		Category = category;
//		Ratings = ratings;
//		Query = query;
//		Username = username;
//		Email = email;
//	}
//
//	public int getFeedbackID() {
//		return FeedbackID;
//	}
//
//	public void setFeedbackID(int feedbackID) {
//		FeedbackID = feedbackID;
//	}
//
//	public Date getDate() {
//		return Date;
//	}
//
//	public void setDate(Date date) {
//		Date = date;
//	}
//
//	public String getCategory() {
//		return Category;
//	}
//
//	public void setCategory(String category) {
//		Category = category;
//	}
//
//	public String getRatings() {
//		return Ratings;
//	}	
//
//	public void setRatings(String ratings) {
//		Ratings = ratings;
//	}
//
//	public String getQuery() {
//		return Query;
//	}
//
//	public void setQuery(String query) {
//		Query = query;
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
//	public String getEmail() {
//		return Email;
//	}
//
//	public void setEmail(String email) {
//		Email = email;
//	}
//
//	@Override
//	public String toString() {
//		return "FeedQry [FeedbackID=" + FeedbackID + ", Date=" + Date + ", Category=" + Category + ", Ratings=" + Ratings
//				+ ", Query=" + Query + ", Username=" + Username + ", Email=" + Email + "]";
//	}
//	
//	
//	
//
//}


package com.NinjaCourier.model;

import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name="FeedQry")
public class FeedQry {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int feedbackID;

    
    @JsonProperty("date")
    
    private String date;

    
    
    @JsonProperty("category")
   
    private String category;

    @JsonProperty("ratings")
 
    private String ratings;

    
    @JsonProperty("query")
    
    private String query;

    
    
    @JsonProperty("username")
    
    private String username;

    
    @JsonProperty("email")
   
    private String email;

    public FeedQry() {}

    public FeedQry(
    		String date, String category, String ratings, String query, String username, String email) {
        
        this.date = date;
        this.category = category;
        this.ratings = ratings;
        this.query = query;
        this.username = username;
        this.email = email;
    }

    // Getters and Setters

    public int getFeedbackID() {
        return feedbackID;
    }

    public void setFeedbackID(int feedbackID) {
        this.feedbackID = feedbackID;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getRatings() {
        return ratings;
    }

    public void setRatings(String ratings) {
        this.ratings = ratings;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "FeedQry [feedbackID=" + feedbackID + ", date=" + date + ", category=" + category + ", ratings=" + ratings
                + ", query=" + query + ", username=" + username + ", email=" + email + "]";
    }
}
