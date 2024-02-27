package com.project.collab_tool;


import com.project.collab_tool.model.UserInfo;
import com.project.collab_tool.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.HashSet;
import java.util.Set;


@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
public class CollabToolApplication {
    /*
    systemctl start docker
    sudo docker rm /postgresql
    sudo docker run -itd -e POSTGRES_USER=amine -e POSTGRES_PASSWORD=amine -p 5432:5432 -v /home/emino/data:/var/lib/postgresql/data --name postgresql postgres
    * */
    public static void main(String[] args) {


        SpringApplication.run(CollabToolApplication.class, args);
    }

    @Bean
    public CommandLineRunner myCommandLineRunner(PasswordEncoder passwordEncoder,
                                                 UserRepository userRepository){
        return args -> {


            UserInfo userInfo = UserInfo.builder().firstName("amine").lastName("mbarki").email("amine@gmail.com").password(passwordEncoder.encode("password")).build();
            userRepository.save(userInfo);
            UserInfo userInfo2 = UserInfo.builder().firstName("karim").lastName("mbarki").email("amine2@gmail.com").password(passwordEncoder.encode("password")).build();
            userRepository.save(userInfo2);
            UserInfo userInfo3 = UserInfo.builder().firstName("salim").lastName("mbarki").email("amine3@gmail.com").password(passwordEncoder.encode("password")).build();
            userRepository.save(userInfo3);
            Set<UserInfo> team = new HashSet<>();
            team.add(userInfo2);
            team.add(userInfo3);
            userInfo.setTeam(team);
            userRepository.save(userInfo);

            userRepository.findByFullNameOrEmailPrefix("a");








        };
    }

}
