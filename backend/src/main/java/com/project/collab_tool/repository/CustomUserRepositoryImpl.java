package com.project.collab_tool.repository;

import com.project.collab_tool.dto.UsersSearchRequest;
import com.project.collab_tool.model.UserInfo;
import com.project.collab_tool.utility.Utils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
public class CustomUserRepositoryImpl implements CustomUserRepository {

    private final EntityManager entityManager;

    @Override
    public List<UserInfo> searchByPrefixed(UsersSearchRequest request) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<UserInfo> criteriaQuery = cb.createQuery(UserInfo.class);

        //Select from users
        Root<UserInfo> root = criteriaQuery.from(UserInfo.class);
        /*
        Redundunt since we can specify same value for email and fullName and i will do the same thing :3
        if (Utils.validateString(request.getEmailOrFullName())) {
            Predicate emailPredicate = cb.like(root.get("email"), request.getEmailOrFullName() + "%");
            Predicate fullNamePredicate = cb.like(root.get("fullName"), request.getEmailOrFullName() + "%");
            Predicate fullNameOrEmailPredicate = cb.or(emailPredicate, fullNamePredicate);
            criteriaQuery.where(fullNameOrEmailPredicate);
            TypedQuery<UserInfo> query = entityManager.createQuery(criteriaQuery);
            return query.getResultList();
        }
        */
        List<Predicate> predicates = new ArrayList<>();
        if (Utils.validateString(request.getEmail()))
            predicates.add(cb.like(root.get("email"), request.getEmail() + "%"));
        if (Utils.validateString(request.getFullName()))
            predicates.add(cb.like(root.get("fullName"), request.getFullName() + "%"));
        criteriaQuery.where(cb.or(predicates.toArray(new Predicate[0])));

        TypedQuery<UserInfo> query = entityManager.createQuery(criteriaQuery);
        return query.getResultList();
    }
}
