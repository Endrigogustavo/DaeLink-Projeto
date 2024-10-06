import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography, Box, Divider, List, ListItem, ListItemIcon, ListItemText, Link } from '@mui/material';
import { CheckCircle, AccountCircle, Gavel, Work, Lock, AssignmentInd, ContactSupport } from '@mui/icons-material';

const TermsOfUse = () => {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5, p: 4, bgcolor: '#f5f5f5', borderRadius: 2, boxShadow: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="primary">Termos de Uso do Daelink</Typography>
        <CheckCircle sx={{ color: 'green', fontSize: 40 }} />
      </Box>

      <Typography variant="body2" color="textSecondary" gutterBottom>
        Última atualização: [Inserir data]
      </Typography>

      <Typography variant="body1" paragraph>
        Bem-vindo ao Daelink, uma plataforma que conecta pessoas com deficiência a oportunidades de emprego em empresas. Ao acessar ou utilizar a plataforma, você concorda com os seguintes Termos de Uso. Se você não concordar com estes termos, por favor, não utilize o Daelink.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Box mb={4}>
        <Typography variant="h5" fontWeight="medium" gutterBottom>
          1. Aceitação dos Termos
        </Typography>
        <Typography variant="body1" paragraph>
          Ao acessar ou usar o Daelink, você concorda em estar legalmente vinculado a estes Termos de Uso, que podem ser modificados a qualquer momento. Recomendamos revisar regularmente esta página para estar ciente de quaisquer mudanças.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" fontWeight="medium" gutterBottom>
          2. Elegibilidade
        </Typography>
        <Typography variant="body1" paragraph>
          Para usar o Daelink, você deve ser maior de idade (18 anos ou mais) ou ter permissão legal para trabalhar. Empresas devem estar devidamente registradas e autorizadas a recrutar profissionais. Pessoas com deficiência (PCD) interessadas em se candidatar devem fornecer informações verdadeiras e precisas sobre suas qualificações e necessidades.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" fontWeight="medium" gutterBottom>
          3. Cadastro e Conta
        </Typography>
        <Typography variant="body1" paragraph>
          Para usar o Daelink, você precisa criar uma conta, fornecendo informações corretas e atualizadas. Você é responsável por manter a confidencialidade dos seus dados de login e por todas as atividades que ocorram em sua conta.
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <AccountCircle color="primary" />
            </ListItemIcon>
            <ListItemText primary="PCDs: Informações como habilidades, qualificações e tipos de deficiência devem ser inseridas de forma clara." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Work color="primary" />
            </ListItemIcon>
            <ListItemText primary="Empresas: Detalhes da vaga, como requisitos, ambiente de trabalho e acessibilidade, devem ser especificados." />
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box mb={4}>
        <Typography variant="h5" fontWeight="medium" gutterBottom>
          4. Uso Permitido
        </Typography>
        <Typography variant="body1" paragraph>
          Você concorda em usar o Daelink apenas para os propósitos a que ele se destina, ou seja, conectar pessoas com deficiência com oportunidades de emprego. É estritamente proibido:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <Lock color="primary" />
            </ListItemIcon>
            <ListItemText primary="Fornecer informações falsas ou enganosas." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Lock color="primary" />
            </ListItemIcon>
            <ListItemText primary="Usar a plataforma para qualquer outro fim além do recrutamento e da busca por emprego." />
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box mb={4}>
        <Typography variant="h5" fontWeight="medium" gutterBottom>
          5. Privacidade
        </Typography>
        <Typography variant="body1" paragraph>
          A coleta e uso das informações pessoais dos usuários seguem as diretrizes da nossa <Link href="/privacy" color="primary" underline="hover">Política de Privacidade</Link>. Suas informações serão utilizadas exclusivamente para conectar candidatos a oportunidades de trabalho e para melhorar os serviços da plataforma.
        </Typography>
      </Box>

      <Box mb={8}>
        <Typography variant="h5" fontWeight="medium" gutterBottom>
          6. Contato
        </Typography>
        <Typography variant="body1" paragraph>
          Se você tiver dúvidas sobre estes Termos de Uso ou sobre o funcionamento da plataforma, entre em contato conosco através do e-mail: [email de contato].
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleNavigateBack}
        sx={{ borderRadius: 50 }}
      >
        Confirmar
      </Button>
    </Container>
  );
};

export default TermsOfUse;
