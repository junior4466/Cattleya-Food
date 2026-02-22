import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen animate-fade-up">
      <div className="max-w-4xl mx-auto bg-bg-card border border-white/5 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <h1 className="font-heading text-4xl md:text-5xl text-gold mb-8 border-b border-white/10 pb-6">
          Política de Privacidade
        </h1>
        
        <div className="space-y-8 text-text-main font-body text-lg leading-relaxed">
          <section>
            <h2 className="font-heading text-2xl text-gold-light mb-3">1. Introdução</h2>
            <p className="text-text-muted">
              A Cattleya Food valoriza a privacidade de seus clientes. Esta política descreve como coletamos, usamos e protegemos suas informações pessoais ao utilizar nosso sistema de pedidos online.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-gold-light mb-3">2. Coleta de Dados</h2>
            <p className="text-text-muted mb-2">Para processar seus pedidos, coletamos as seguintes informações:</p>
            <ul className="list-disc list-inside text-text-muted ml-4 space-y-1">
              <li>Nome completo</li>
              <li>Número de telefone (WhatsApp)</li>
              <li>Endereço de entrega (para pedidos via Delivery)</li>
              <li>Informações de pagamento (método escolhido)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-gold-light mb-3">3. Uso das Informações</h2>
            <p className="text-text-muted">
              Seus dados são utilizados exclusivamente para:
            </p>
            <ul className="list-disc list-inside text-text-muted ml-4 space-y-1 mt-2">
              <li>Processar e entregar seu pedido;</li>
              <li>Enviar confirmações e atualizações de status via WhatsApp;</li>
              <li>Melhorar nossa oferta de produtos e serviços.</li>
            </ul>
            <p className="text-text-muted mt-3">
              <strong className="text-gold">Não</strong> compartilhamos suas informações com terceiros para fins de marketing sem o seu consentimento explícito.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-gold-light mb-3">4. Segurança</h2>
            <p className="text-text-muted">
              Implementamos medidas de segurança para proteger seus dados contra acesso não autorizado. Utilizamos conexões seguras e armazenamos dados de forma restrita apenas pelo tempo necessário para cumprimento legal e operacional.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-gold-light mb-3">5. Seus Direitos</h2>
            <p className="text-text-muted">
              Você tem o direito de solicitar a visualização, correção ou exclusão de seus dados pessoais de nossa base a qualquer momento, entrando em contato através de nossos canais oficiais.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-gold-light mb-3">6. Contato</h2>
            <p className="text-text-muted">
              Em caso de dúvidas sobre esta política, entre em contato conosco através do telefone/WhatsApp disponível no rodapé deste site.
            </p>
          </section>

          <div className="pt-8 border-t border-white/10 text-sm text-text-muted italic">
            Última atualização: Outubro de 2025.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;