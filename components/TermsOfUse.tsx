import React from 'react';

const TermsOfUse: React.FC = () => {
  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen animate-fade-up">
      <div className="max-w-4xl mx-auto bg-bg-card border border-white/5 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

        <h1 className="font-heading text-4xl md:text-5xl text-gold mb-8 border-b border-white/10 pb-6">
          Termos de Uso
        </h1>
        
        <div className="space-y-8 text-text-main font-body text-lg leading-relaxed">
          <section>
            <h2 className="font-heading text-2xl text-gold-light mb-3">1. Aceitação dos Termos</h2>
            <p className="text-text-muted">
              Ao acessar e utilizar o site da Cattleya Food para realizar pedidos, você concorda com os termos e condições descritos abaixo. Caso não concorde, recomendamos não utilizar nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-gold-light mb-3">2. Serviços Oferecidos</h2>
            <p className="text-text-muted">
              A Cattleya Food oferece serviços de preparo e venda de alimentos e bebidas de alta gastronomia para entrega (Delivery) ou retirada no local.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-gold-light mb-3">3. Realização de Pedidos</h2>
            <ul className="list-disc list-inside text-text-muted ml-4 space-y-2">
              <li>O cliente é responsável pela veracidade das informações fornecidas (endereço, telefone, etc).</li>
              <li>Pedidos estão sujeitos à disponibilidade de insumos e confirmação pela nossa equipe.</li>
              <li>O tempo de entrega informado é uma estimativa e pode variar conforme demanda e condições climáticas.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-gold-light mb-3">4. Preços e Pagamento</h2>
            <p className="text-text-muted">
              Os preços apresentados no cardápio digital podem sofrer alterações sem aviso prévio. O valor final a ser pago é o que consta no momento da confirmação do pedido no checkout.
            </p>
            <p className="text-text-muted mt-2">
              Aceitamos pagamentos via Pix, cartões de crédito/débito e dinheiro, conforme selecionado no ato do pedido.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-gold-light mb-3">5. Cancelamento</h2>
            <p className="text-text-muted">
              O cancelamento de pedidos pode ser solicitado apenas se o preparo ainda não tiver sido iniciado. Para cancelar, entre em contato imediatamente via WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-gold-light mb-3">6. Propriedade Intelectual</h2>
            <p className="text-text-muted">
              Todo o conteúdo deste site, incluindo imagens, textos e logotipos, é propriedade da Cattleya Food e está protegido pelas leis de direitos autorais.
            </p>
          </section>

          <div className="pt-8 border-t border-white/10 text-sm text-text-muted italic">
            Cattleya Food - Alta Gastronomia.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;