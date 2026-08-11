package org.example.logitrackback.service;


import lombok.RequiredArgsConstructor;
import org.example.logitrackback.entity.Client;
import org.example.logitrackback.exception.ResourceNotFoundException;
import org.example.logitrackback.repository.ClientRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ClientService {

    private final ClientRepository clientRepository;

    public Client creerClient(Client client) {
        return clientRepository.save(client);
    }

    @Transactional(readOnly = true)
    public Page<Client> getAllClients(Pageable pageable) {
        return clientRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Client getClientById(Long id) {
        return clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client", id));
    }

    public void supprimerClient(Long id) {
        if (!clientRepository.existsById(id)) {
            throw new ResourceNotFoundException("Client", id);
        }
        clientRepository.deleteById(id);
    }
}
