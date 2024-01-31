package com.project.collab_tool.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SourceType;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Post {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(columnDefinition = "TEXT")
  private String content;


  @OneToMany(mappedBy = "post")
  private List<FileInfo> files = new ArrayList<>();

  @ManyToOne
  private Topic topic;

  @ManyToOne
  private UserInfo createdBy;

  @CreationTimestamp(source = SourceType.DB)
  private Instant createdOn;
  @UpdateTimestamp(source = SourceType.DB)
  private Instant lastUpdatedOn;

}
