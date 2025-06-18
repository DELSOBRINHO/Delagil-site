    <UPDATED_CODE>
      <UPDATED_CODE>  <UPDATED_CODE>  <UPDATED_CODE>  <UPDATED_CODE>  <UPDATED_CODE>
        colors: {
          'brand-primary': '#0056b3',
          'brand-primary-dark': '#004494',
          'brand-primary-light': '#3378c5',
          'brand-secondary': '#2c3e50',
          'brand-accent': '#ff6b00',
          'brand-accent-alt': '#e74c3c',
          'brand-text-primary': '#1a202c',
          'brand-text-secondary': '#4a5568',
          'brand-text-on-primary': '#ffffff',
          'brand-background': '#f8fafc',
          'brand-background-alt': '#edf2f7',
          'brand-border': '#e2e8f0',
        }
        ```

        ### 📏 Espaçamento e Tipografia

        O projeto segue a escala de espaçamento e tipografia padrão do Tailwind CSS, com algumas personalizações:

        ```javascript
        fontSize: {
          'xs': ['0.75rem', { lineHeight: '1rem' }],
          'sm': ['0.875rem', { lineHeight: '1.25rem' }],
          'base': ['1rem', { lineHeight: '1.5rem' }],
          'lg': ['1.125rem', { lineHeight: '1.75rem' }],
          'xl': ['1.25rem', { lineHeight: '1.75rem' }],
          '2xl': ['1.5rem', { lineHeight: '2rem' }],
          '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
          '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
          '5xl': ['3rem', { lineHeight: '1' }],
          '6xl': ['3.75rem', { lineHeight: '1' }],
        }
        ```

        ## 🧩 Componentes Base

        ### 🔘 Button

        O componente `Button` é um dos mais utilizados na aplicação, oferecendo diferentes variantes e tamanhos.

        #### Props

        ```typescript
        interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
          variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
          size?: 'sm' | 'md' | 'lg';
          leftIcon?: React.ReactNode;
          rightIcon?: React.ReactNode;
          isLoading?: boolean;
          className?: string;
          hoverEffect?: boolean;
        }
        ```

        #### Implementação

        ```tsx
        const Button: React.FC<ButtonProps> = ({
          children,
          variant = 'primary',
          size = 'md',
          leftIcon,
          rightIcon,
          isLoading = false,
          className = '',
          hoverEffect = false,
          ...props
        }) => {
          // Estilos base
          const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
          // Variantes
          const variantStyles = {
            primary: 'bg-brand-primary text-brand-text-on-primary hover:bg-brand-primary-dark focus:ring-brand-primary',
            secondary: 'bg-brand-secondary text-brand-text-on-primary hover:bg-opacity-90 focus:ring-brand-secondary',
            outline: 'bg-transparent border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-text-on-primary focus:ring-brand-primary',
            ghost: 'bg-transparent text-brand-primary hover:bg-brand-primary-light hover:bg-opacity-10 focus:ring-brand-primary',
          };
  
          // Tamanhos
          const sizeStyles = {
            sm: 'text-sm px-3 py-1.5',
            md: 'text-base px-4 py-2',
            lg: 'text-lg px-6 py-3',
          };
  
          // Efeito de hover
          const hoverEffectStyle = hoverEffect ? 'transform hover:-translate-y-1 hover:shadow-md' : '';
  
          // Estado de loading
          const loadingState = isLoading ? 'opacity-70 cursor-not-allowed' : '';
  
          return (
            <button
              className={`
                ${baseStyles}
                ${variantStyles[variant]}
                ${sizeStyles[size]}
                ${hoverEffectStyle}
                ${loadingState}
                ${className}
              `}
              disabled={isLoading || props.disabled}
              {...props}
            >
              {isLoading && (
                <span className="mr-2">
                  <Spinner size={size === 'sm' ? 'sm' : 'md'} />
                </span>
              )}
      
              {!isLoading && leftIcon && (
                <span className="mr-2">{leftIcon}</span>
              )}
      
              {children}
      
              {!isLoading && rightIcon && (
                <span className="ml-2">{rightIcon}</span>
              )}
            </button>
          );
        };
        ```

        #### Exemplos de Uso

        ```tsx
        // Botão primário padrão
        <Button>Clique Aqui</Button>

        // Botão secundário com ícone
        <Button 
          variant="secondary" 
          leftIcon={<Mail size={16} />}
        >
          Enviar Email
        </Button>

        // Botão outline grande
        <Button 
          variant="outline" 
          size="lg"
        >
          Saiba Mais
        </Button>

        // Botão com estado de loading
        <Button isLoading>Processando</Button>

        // Botão com efeito de hover
        <Button hoverEffect rightIcon={<ArrowRight size={16} />}>
          Continuar
        </Button>
        ```

        ### 🃏 Card

        O componente `Card` é usado para exibir conteúdo em um contêiner com sombra e bordas arredondadas.

        #### Props

        ```typescript
        interface CardProps {
          children: React.ReactNode;
          className?: string;
          hoverEffect?: boolean;
          onClick?: () => void;
        }
        ```

        #### Implementação

        ```tsx
        const Card: React.FC<CardProps> = ({
          children,
          className = '',
          hoverEffect = false,
          onClick,
        }) => {
          const baseStyles = 'bg-white rounded-lg shadow-sm border border-brand-border overflow-hidden';
          const hoverStyles = hoverEffect 
            ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1' 
            : '';
          const clickableStyles = onClick ? 'cursor-pointer' : '';
  
          return (
            <div 
              className={`${baseStyles} ${hoverStyles} ${clickableStyles} ${className}`}
              onClick={onClick}
            >
              {children}
            </div>
          );
        };
        ```

        #### Exemplos de Uso

        ```tsx
        // Card básico
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-2">Título do Card</h3>
          <p>Conteúdo do card aqui.</p>
        </Card>

        // Card com efeito de hover
        <Card hoverEffect className="p-6">
          <h3 className="text-xl font-semibold mb-2">Card Interativo</h3>
          <p>Passe o mouse para ver o efeito.</p>
        </Card>

        // Card clicável
        <Card 
          hoverEffect 
          className="p-6"
          onClick={() => alert('Card clicado!')}
        >
          <h3 className="text-xl font-semibold mb-2">Card Clicável</h3>
          <p>Clique neste card para uma ação.</p>
        </Card>
        ```

        ### 📝 Input

        O componente `Input` é usado para campos de entrada de texto.

        #### Props

        ```typescript
        interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
          label?: string;
          error?: string;
          helperText?: string;
          leftIcon?: React.ReactNode;
          rightIcon?: React.ReactNode;
          className?: string;
        }
        ```

        #### Implementação

        ```tsx
        const Input = React.forwardRef<HTMLInputElement, InputProps>(
          ({ label, error, helperText, leftIcon, rightIcon, className = '', ...props }, ref) => {
            const id = useId();
            const inputId = props.id || `input-${id}`;
    
            const baseInputStyles = 'w-full rounded-md border border-brand-border px-4 py-2 text-brand-text-primary focus:border-brand-primary focus:ring-1 focus:ring-brand-primary';
            const errorInputStyles = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';
            const iconPaddingLeft = leftIcon ? 'pl-10' : '';
            const iconPaddingRight = rightIcon ? 'pr-10' : '';
    
            return (
              <div className={className}>
                {label && (
                  <label 
                    htmlFor={inputId} 
                    className="block text-sm font-medium text-brand-text-secondary mb-1"
                  >
                    {label}
                    {props.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                )}
        
                <div className="relative">
                  {leftIcon && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      {leftIcon}
                    </div>
                  )}
          
                  <input
                    id={inputId}
                    ref={ref}
                    className={`
                      ${baseInputStyles}
                      ${errorInputStyles}
                      ${iconPaddingLeft}
                      ${iconPaddingRight}
                    `}
                    {...props}
                  />
          
                  {rightIcon && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                      {rightIcon}
                    </div>
                  )}
                </div>
        
                {error && (
                  <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
        
                {helperText && !error && (
                  <p className="mt-1 text-sm text-brand-text-secondary">{helperText}</p>
                )}
              </div>
            );
          }
        );
        ```

        #### Exemplos de Uso

        ```tsx
        // Input básico
        <Input
          label="Nome"
          placeholder="Digite seu nome"
          required
        />

        // Input com ícone
        <Input
          label="Email"
          type="email"
          placeholder="seu@email.com"
          leftIcon={<Mail size={16} />}
          required
        />

        // Input com erro
        <Input
          label="Senha"
          type="password"
          error="A senha deve ter pelo menos 8 caracteres"
          leftIcon={<Lock size={16} />}
        />

        // Input com texto de ajuda
        <Input
          label="Usuário"
          helperText="Seu nome de usuário deve ser único"
          leftIcon={<User size={16} />}
        />
        ```

        ### 📝 Textarea

        O componente `Textarea` é usado para campos de entrada de texto com múltiplas linhas.

        #### Props

        ```typescript
        interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
          label?: string;
          error?: string;
          helperText?: string;
          className?: string;
        }
        ```

        #### Implementação

        ```tsx
        const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
          ({ label, error, helperText, className = '', ...props }, ref) => {
            const id = useId();
            const textareaId = props.id || `textarea-${id}`;
    
            const baseStyles = 'w-full rounded-md border border-brand-border px-4 py-2 text-brand-text-primary focus:border-brand-primary focus:ring-1 focus:ring-brand-primary';
            const errorStyles = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';
    
            return (
              <div className={className}>
                {label && (
                  <label 
                    htmlFor={textareaId} 
                    className="block text-sm font-medium text-brand-text-secondary mb-1"
                  >
                    {label}
                    {props.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                )}
        
                <textarea
                  id={textareaId}
                  ref={ref}
                  className={`${baseStyles} ${errorStyles}`}
                  rows={props.rows || 4}
                  {...props}
                />
        
                {error && (
                  <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
        
                {helperText && !error && (
                  <p className="mt-1 text-sm text-brand-text-secondary">{helperText}</p>
                )}
              </div>
            );
          }
        );
        ```

        #### Exemplos de Uso

        ```tsx
        // Textarea básico
        <Textarea
          label="Mensagem"
          placeholder="Digite sua mensagem"
          required
        />

        // Textarea com número de linhas personalizado
        <Textarea
          label="Descrição"
          placeholder="Descreva seu projeto"
          rows={6}
        />

        // Textarea com erro
        <Textarea
          label="Feedback"
          error="O feedback deve ter pelo menos 10 caracteres"
        />

        // Textarea com texto de ajuda
        <Textarea
          label="Comentários"
          helperText="Seus comentários nos ajudam a melhorar"
        />
        ```

        ### 🔄 Select

        O componente `Select` é usado para campos de seleção.

        #### Props

        ```typescript
        interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'multiple'> {
          label?: string;
          error?: string;
          helperText?: string;
          multiple?: boolean;
          className?: string;
        }
        ```

        #### Implementação

        ```tsx
        const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
          ({ label, error, helperText, multiple, className = '', children, ...props }, ref) => {
            const id = useId();
            const selectId = props.id || `select-${id}`;
    
            const baseStyles = 'w-full rounded-md border border-brand-border px-4 py-2 text-brand-text-primary focus:border-brand-primary focus:ring-1 focus:ring-brand-primary';
            const errorStyles = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';
            const multipleStyles = multiple ? 'h-32' : '';
    
            return (
              <div className={className}>
                {label && (
                  <label 
                    htmlFor={selectId} 
                    className="block text-sm font-medium text-brand-text-secondary mb-1"
                  >
                    {label}
                    {props.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                )}
        
                <select
                  id={selectId}
                  ref={ref}
                  multiple={multiple}
                  className={`${baseStyles} ${errorStyles} ${multipleStyles}`}
                  {...props}
                >
                  {children}
                </select>
        
                {error && (
                  <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
        
                {helperText && !error && (
                  <p className="mt-1 text-sm text-brand-text-secondary">{helperText}</p>
                )}
              </div>
            );
          }
        );
        ```

        #### Exemplos de Uso

        ```tsx
        // Select básico
        <Select
          label="Categoria"
          required
        >
          <option value="">Selecione uma categoria</option>
          <option value="marketing">Marketing Digital</option>
          <option value="design">Design Gráfico</option>
          <option value="dev">Desenvolvimento Web</option>
        </Select>

        // Select múltiplo
        <Select
          label="Interesses"
          multiple
          helperText="Segure Ctrl para selecionar múltiplos"
        >
          <option value="blog">Blog</option>
          <option value="newsletter">Newsletter</option>
          <option value="webinar">Webinars</option>
          <option value="ebook">E-books</option>
        </Select>

        // Select com erro
        <Select
          label="Estado"
          error="Por favor, selecione um estado"
        >
          <option value="">Selecione um estado</option>
          <option value="sp">São Paulo</option>
          <option value="rj">Rio de Janeiro</option>
          <option value="mg">Minas Gerais</option>
        </Select>
        ```

        ### ✅ Checkbox

        O componente `Checkbox` é usado para campos de seleção booleana.

        #### Props

        ```typescript
        interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
          label: string;
          error?: string;
          helperText?: string;
          className?: string;
        }
        ```

        #### Implementação

        ```tsx
        const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
          ({ label, error, helperText, className = '', ...props }, ref) => {
            const id = useId();
            const checkboxId = props.id || `checkbox-${id}`;
    
            return (
              <div className={className}>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id={checkboxId}
                      type="checkbox"
                      ref={ref}
                      className="w-4 h-4 text-brand-primary border-brand-border rounded focus:ring-brand-primary"
                      {...props}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label 
                      htmlFor={checkboxId} 
                      className="font-medium text-brand-text-secondary"
                    >
                      {label}
                    </label>
            
                    {helperText && !error && (
                      <p className="text-brand-text-secondary">{helperText}</p>
                    )}
                  </div>
                </div>
        
                {error && (
                  <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
              </div>
            );
          }
        );
        ```

        #### Exemplos de Uso

        ```tsx
        // Checkbox básico
        <Checkbox
          label="Aceito os termos e condições"
          required
        />

        // Checkbox com texto de ajuda
        <Checkbox
          label="Inscrever-se na newsletter"
          helperText="Receba novidades e ofertas exclusivas"
        />

        // Checkbox com erro
        <Checkbox
          label="Aceito a política de privacidade"
          error="Você deve aceitar a política de privacidade para continuar"
        />
        ```

        ### 📻 Radio

        O componente `Radio` é usado para grupos de opções mutuamente exclusivas.

        #### Props

        ```typescript
        interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
          label: string;
          className?: string;
        }

        interface RadioGroupProps {
          label?: string;
          name: string;
          options: Array<{ value: string; label: string }>;
          value?: string;
          onChange?: (value: string) => void;
          error?: string;
          helperText?: string;
          className?: string;
        }
        ```

        #### Implementação

        ```tsx
        const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
          ({ label, className = '', ...props }, ref) => {
            const id = useId();
            const radioId = props.id || `radio-${id}`;
    
            return (
              <div className={`flex items-center ${className}`}>
                <input
                  id={radioId}
                  type="radio"
                  ref={ref}
                  className="w-4 h-4 text-brand-primary border-brand-border focus:ring-brand-primary"
                  {...props}
                />
                <label 
                  htmlFor={radioId} 
                  className="ml-2 text-sm font-medium text-brand-text-secondary"
                >
                  {label}
                </label>
              </div>
            );
          }
        );

        const RadioGroup: React.FC<RadioGroupProps> = ({
          label,
          name,
          options,
          value,
          onChange,
          error,
          helperText,
          className = '',
        }) => {
          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (onChange) {
              onChange(e.target.value);
            }
          };
  
          return (
            <div className={className}>
              {label && (
                <div className="text-sm font-medium text-brand-text-secondary mb-2">
                  {label}
                </div>
              )}
      
              <div className="space-y-2">
                {options.map((option) => (
                  <Radio
                    key={option.value}
                    name={name}
                    value={option.value}
                    label={option.label}
                    checked={value === option.value}
                    onChange={handleChange}
                  />
                ))}
              </div>
      
              {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
              )}
      
              {helperText && !error && (
                <p className="mt-1 text-sm text-brand-text-secondary">{helperText}</p>
              )}
            </div>
          );
        };
        ```

        #### Exemplos de Uso

        ```tsx
        // RadioGroup básico
        <RadioGroup
          label="Gênero"
          name="gender"
          options={[
            { value: 'male', label: 'Masculino' },
            { value: 'female', label: 'Feminino' },
            { value: 'other', label: 'Outro' },
          ]}
          value={gender}
          onChange={setGender}
        />

        // RadioGroup com erro
        <RadioGroup
          label="Método de Pagamento"
          name="payment"
          options={[
            { value: 'credit', label: 'Cartão de Crédito' },
            { value: 'debit', label: 'Cartão de Débito' },
            { value: 'pix', label: 'PIX' },
          ]}
          value={payment}
          onChange={setPayment}
          error="Por favor, selecione um método de pagamento"
        />

        // RadioGroup com texto de ajuda
        <RadioGroup
          label="Preferência de Contato"
          name="contact"
          options={[
            { value: 'email', label: 'Email' },
            { value: 'phone', label: 'Telefone' },
            { value: 'whatsapp', label: 'WhatsApp' },
          ]}
          value={contactPreference}
          onChange={setContactPreference}
          helperText="Como você prefere que entremos em contato?"
        />
        ```

        ### 🔄 Spinner

        O componente `Spinner` é usado para indicar carregamento.

        #### Props

        ```typescript
        interface SpinnerProps {
          size?: 'sm' | 'md' | 'lg';
          color?: 'primary' | 'white';
          className?: string;
        }
        ```

        #### Implementação

        ```tsx
        const Spinner: React.FC<SpinnerProps> = ({
          size = 'md',
          color = 'primary',
          className = '',
        }) => {
          const sizeStyles = {
            sm: 'w-4 h-4',
            md: 'w-6 h-6',
            lg: 'w-8 h-8',
          };
  
          const colorStyles = {
            primary: 'text-brand-primary',
            white: 'text-white',
          };
  
          return (
            <svg
              className={`animate-spin ${sizeStyles[size]} ${colorStyles[color]} ${className}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          );
        };
        ```

        #### Exemplos de Uso

        ```tsx
        // Spinner padrão
        <Spinner />

        // Spinner pequeno branco
        <Spinner size="sm" color="white" />

        // Spinner grande
        <Spinner size="lg" />

        // Spinner com classe personalizada
        <Spinner className="mx-auto my-4" />
        ```

        ### 🚨 Alert

        O componente `Alert` é usado para exibir mensagens importantes.

        #### Props

        ```typescript
        interface AlertProps {
          title?: string;
          children: React.ReactNode;
          variant?: 'info' | 'success' | 'warning' | 'error';
          icon?: React.ReactNode;
          onClose?: () => void;
          className?: string;
        }
        ```

        #### Implementação

        ```tsx
        const Alert: React.FC<AlertProps> = ({
          title,
          children,
          variant = 'info',
          icon,
          onClose,
          className = '',
        }) => {
          // Estilos por variante
          const variantStyles = {
            info: {
              container: 'bg-blue-50 border-blue-200 text-blue-800',
              icon: <Info size={20} className="text-blue-500" />,
            },
            success: {
              container: 'bg-green-50 border-green-200 text-green-800',
              icon: <CheckCircle size={20} className="text-green-500" />,
            },
            warning: {
              container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
              icon: <AlertTriangle size={20} className="text-yellow-500" />,
            },
            error: {
              container: 'bg-red-50 border-red-200 text-red-800',
              icon: <AlertCircle size={20} className="text-red-500" />,
            },
          };
  
          const currentIcon = icon || variantStyles[variant].icon;
  
          return (
            <div className={`rounded-md border p-4 ${variantStyles[variant].container} ${className}`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  {currentIcon}
                </div>
                <div className="ml-3 flex-grow">
                  {title && (
                    <h3 className="text-sm font-medium">{title}</h3>
                  )}
                  <div className={`text-sm ${title ? 'mt-2' : ''}`}>
                    {children}
                  </div>
                </div>
                {onClose && (
                  <div className="ml-auto pl-3">
                    <button
                      type="button"
                      className="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
                      onClick={onClose}
                      aria-label="Fechar"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        };
        ```

        #### Exemplos de Uso

        ```tsx
        // Alert de informação
        <Alert>
          Esta é uma mensagem informativa.
        </Alert>

        // Alert de sucesso com título
        <Alert
          variant="success"
          title="Operação concluída"
        >
          Seus dados foram salvos com sucesso.
        </Alert>

        // Alert de aviso com botão de fechar
        <Alert
          variant="warning"
          title="Atenção"
          onClose={() => setShowWarning(false)}
        >
          Sua assinatura expirará em 3 dias.
        </Alert>

        // Alert de erro
        <Alert variant="error">
          Ocorreu um erro ao processar sua solicitação.
        </Alert>
        ```

        ### 📑 Tabs

        O componente `Tabs` é usado para organizar conteúdo em abas.

        #### Props

        ```typescript
        interface Tab {
          id: string;
          label: string;
          content: React.ReactNode;
          icon?: React.ReactNode;
        }

        interface TabsProps {
          tabs: Tab[];
          defaultTabId?: string;
          onChange?: (tabId: string) => void;
          className?: string;
        }
        ```

        #### Implementação

        ```tsx
        const Tabs: React.FC<TabsProps> = ({
          tabs,
          defaultTabId,
          onChange,
          className = '',
        }) => {
          const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id || '');
  
          const handleTabChange = (tabId: string) => {
            setActiveTab(tabId);
            if (onChange) {
              onChange(tabId);
            }
          };
  
          return (
            <div className={className}>
              <div className="border-b border-brand-border">
                <nav className="-mb-px flex space-x-8">
                  {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={`
                          py-4 px-1 border-b-2 font-medium text-sm
                          ${isActive
                            ? 'border-brand-primary text-brand-primary'
                            : 'border-transparent text-brand-text-secondary hover:text-brand-text-primary hover:border-brand-border'
                          }
                        `}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <div className="flex items-center">
                          {tab.icon && (
                            <span className="mr-2">{tab.icon}</span>
                          )}
                          {tab.label}
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>
      
              <div className="mt-4">
                {tabs.find(tab => tab.id === activeTab)?.content}
              </div>
            </div>
          );
        };
        ```

        #### Exemplos de Uso

        ```tsx
        // Tabs básico
        <Tabs
          tabs={[
            {
              id: 'description',
              label: 'Descrição',
              content: <p>Conteúdo da descrição aqui...</p>,
            },
            {
              id: 'specifications',
              label: 'Especificações',
              content: <p>Conteúdo das especificações aqui...</p>,
            },
            {
              id: 'reviews',
              label: 'Avaliações',
              content: <p>Conteúdo das avaliações aqui...</p>,
            },
          ]}
        />

        // Tabs com ícones
        <Tabs
          tabs={[
            {
              id: 'profile',
              label: 'Perfil',
              icon: <User size={16} />,
              content: <ProfileContent />,
            },
            {
              id: 'settings',
              label: 'Configurações',
              icon: <Settings size={16} />,
              content: <SettingsContent />,
            },
            {
              id: 'notifications',
              label: 'Notificações',
              icon: <Bell size={16} />,
              content: <NotificationsContent />,
            },
          ]}
          defaultTabId="settings"
          onChange={(tabId) => console.log(`Tab changed to: ${tabId}`)}
        />
        ```

        ### 🔢 Pagination

        O componente `Pagination` é usado para navegação entre páginas de conteúdo.

        #### Props

        ```typescript
        interface PaginationProps {
          currentPage: number;
          totalPages: number;
          onPageChange: (page: number) => void;
          className?: string;
        }
        ```

        #### Implementação

        ```tsx
        const Pagination: React.FC<PaginationProps> = ({
          currentPage,
          totalPages,
          onPageChange,
          className = '',
        }) => {
          // Determinar quais páginas mostrar
          const getPageNumbers = () => {
            const pages = [];
    
            // Sempre mostrar a primeira página
            pages.push(1);
    
            // Adicionar páginas ao redor da página atual
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
              pages.push(i);
            }
    
            // Sempre mostrar a última página se houver mais de uma
            if (totalPages > 1) {
              pages.push(totalPages);
            }
    
            // Adicionar elipses onde necessário
            const result = [];
            let prev = 0;
    
            for (const page of pages) {
              if (page - prev > 1) {
                result.push(-1); // -1 representa elipse
              }
              result.push(page);
              prev = page;
            }
    
            return result;
          };
  
          const pageNumbers = getPageNumbers();
  
          return (
            <nav className={`flex justify-center ${className}`}>
              <ul className="flex items-center">
                {/* Botão Anterior */}
                <li>
                  <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`
                      px-3 py-1 rounded-md mr-2 text-sm
                      ${currentPage === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-brand-primary hover:bg-brand-primary-light hover:bg-opacity-10'
                      }
                    `}
                    aria-label="Página anterior"
                  >
                    <ChevronLeft size={16} />
                  </button>
                </li>
        
                {/* Números de Página */}
                {pageNumbers.map((page, index) => (
                  <li key={index}>
                    {page === -1 ? (
                      <span className="px-3 py-1 text-gray-500">...</span>
                    ) : (
                      <button
                        onClick={() => onPageChange(page)}
                        className={`
                          px-3 py-1 rounded-md mx-1 text-sm
                          ${currentPage === page
                            ? 'bg-brand-primary text-white'
                            : 'text-brand-text-secondary hover:bg-brand-background-alt'
                          }
                        `}
                        aria-current={currentPage === page ? 'page' : undefined}
                      >
                        {page}
                      </button>
                    )}
                  </li>
                ))}
        
                {/* Botão Próximo */}
                <li>
                  <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`
                      px-3 py-1 rounded-md ml-2 text-sm
                      ${currentPage === totalPages
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-brand-primary hover:bg-brand-primary-light hover:bg-opacity-10'
                      }
                    `}
                    aria-label="Próxima página"
                  >
                    <ChevronRight size={16} />
                  </button>
                </li>
              </ul>
            </nav>
          );
        };
        ```

        #### Exemplos de Uso

        ```tsx
        // Paginação básica
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={setCurrentPage}
        />

        // Paginação com classe personalizada
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-8"
        />
        ```

        ### 🔍 SearchInput

        O componente `SearchInput` é usado para campos de busca.

        #### Props

        ```typescript
        interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
          onSearch?: (value: string) => void;
          className?: string;
        }
        ```

        #### Implementação

        ```tsx
        const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
          ({ onSearch, className = '', ...props }, ref) => {
            const [value, setValue] = useState(props.value || props.defaultValue || '');
    
            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const newValue = e.target.value;
              setValue(newValue);
      
              if (props.onChange) {
                props.onChange(e);
              }
            };
    
            const handleSubmit = (e: React.FormEvent) => {
              e.preventDefault();
              if (onSearch) {
                onSearch(value as string);
              }
            };
    
            return (
              <form onSubmit={handleSubmit} className={`relative ${className}`}>
                <input
                  type="text"
                  ref={ref}
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-brand-border focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                  value={value}
                  onChange={handleChange}
                  {...props}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <Search size={16} />
                </div>
                {value && (
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    onClick={() => {
                      setValue('');
                      if (props.onChange) {
                        const event = {
                          target: { value: '' }
                        } as React.ChangeEvent<HTMLInputElement>;
                        props.onChange(event);
                      }
                      if (onSearch) {
                        onSearch('');
                      }
                    }}
                    aria-label="Limpar busca"
                  >
                    <X size={16} />
                  </button>
                )}
              </form>
            );
          }
        );
        ```

        #### Exemplos de Uso

        ```tsx
        // SearchInput básico
        <SearchInput
          placeholder="Buscar..."
          onSearch={handleSearch}
        />

        // SearchInput com valor inicial
        <SearchInput
          placeholder="Buscar produtos..."
          defaultValue={searchTerm}
          onSearch={handleSearch}
          className="max-w-md mx-auto"
        />
        ```

        ## 🧩 Componentes Compostos

        ### 📋 ContactForm

        O componente `ContactForm` é usado para formulários de contato.

        #### Props

        ```typescript
        interface ContactFormProps {
          availableServices?: Pick<Service, 'id' | 'title'>[];
          onSubmitSuccess?: () => void;
        }
        ```

        #### Implementação

        ```tsx
        const ContactForm: React.FC<ContactFormProps> = ({ availableServices, onSubmitSuccess }) => {
          const [formData, setFormData] = useState<ContactFormData>({
            name: '',
            email: '',
            phone: '',
            company: '',
            serviceInterest: [],
            message: '',
          });
          const [isLoading, setIsLoading] = useState(false);
          const [error, setError] = useState<string | null>(null);
          const [success, setSuccess] = useState<string | null>(null);

          const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));
          };

          const handleServiceInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { value, checked } = e.target;
            setFormData(prev => {
              const currentInterests = prev.serviceInterest || [];
              if (checked) {
                return { ...prev, serviceInterest: [...currentInterests, value] };
              } else {
                return { ...prev, serviceInterest: currentInterests.filter(interest => interest !== value) };
              }
            });
          };

          const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setIsLoading(true);
            setError(null);
            setSuccess(null);

            try {
              // Lógica de envio do formulário
              console.log("Form data submitted:", formData);
              await new Promise(resolve => setTimeout(resolve, 1000)); // Simulação de API

              setSuccess('Mensagem enviada com sucesso! Entraremos em contato em breve.');
              setFormData({ name: '', email: '', phone: '', company: '', serviceInterest: [], message: '' });
              if (onSubmitSuccess) onSubmitSuccess();
            } catch (err) {
              setError('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
              console.error(err);
            } finally {
              setIsLoading(false);
            }
          };

          return (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="error" onClose={() => setError(null)}>
                  {error}
                </Alert>
              )}
      
              {success && (
                <Alert variant="success" onClose={() => setSuccess(null)}>
                  {success}
                </Alert>
              )}
      
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Nome"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Seu nome completo"
                />
        
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="seu@email.com"
                />
        
                <Input
                  label="Telefone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                />
        
                <Input
                  label="Empresa"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Nome da sua empresa"
                />
              </div>
      
              {availableServices && availableServices.length > 0 && (
                <div>
                  <p className="block text-sm font-medium text-brand-text-secondary mb-2">
                    Serviços de Interesse
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {availableServices.map(service => (
                      <Checkbox
                        key={service.id}
                        label={service.title}
                        name="serviceInterest"
                        value={service.id}
                        checked={formData.serviceInterest.includes(service.id)}
                        onChange={handleServiceInterestChange}
                      />
                    ))}
                  </div>
                </div>
              )}
      
              <Textarea
                label="Mensagem"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Descreva como podemos ajudar..."
                rows={5}
              />
      
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full sm:w-auto"
              >
                Enviar Mensagem
              </Button>
            </form>
          );
        };
        ```

        #### Exemplo de Uso

        ```tsx
        // Formulário de contato básico
        <ContactForm />

        // Formulário de contato com serviços disponíveis
        <ContactForm
          availableServices={[
            { id: '1', title: 'Marketing Digital' },
            { id: '2', title: 'Desenvolvimento Web' },
            { id: '3', title: 'Design Gráfico' },
          ]}
          onSubmitSuccess={() => {
            console.log('Formulário enviado com sucesso!');
            // Redirecionar ou mostrar mensagem adicional
          }}
        />
        ```

        ### 🖼️ PortfolioCard

        O componente `PortfolioCard` é usado para exibir itens de portfólio.

        #### Props

        ```typescript
        interface PortfolioCardProps {
          item: PortfolioItem;
        }
        ```

        #### Implementação

        ```tsx
        const PortfolioCard: React.FC<PortfolioCardProps> = ({ item }) => {
          return (
            <Card className="flex flex-col" hoverEffect>
              <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-brand-primary mb-2">{item.title}</h3>
                <p className="text-sm text-brand-text-secondary mb-1"><span className="font-medium">Categoria:</span> {item.category}</p>
                <p className="text-sm text-brand-text-secondary mb-4 flex-grow">{item.description}</p>
                {item.link && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => window.open(item.link, '_blank')}
                    rightIcon={<ExternalLink size={16}/>}
                    className="mt-auto"
                  >
                    Ver Projeto
                  </Button>
                )}
              </div>
            </Card>
          );
        };
        ```

        #### Exemplo de Uso

        ```tsx
        // PortfolioCard básico
        <PortfolioCard
          item={{
            id: '1',
            title: 'Redesign de Site Corporativo',
            category: 'Web Design',
            description: 'Redesign completo do site corporativo da empresa XYZ, com foco em melhorar a experiência do usuário e aumentar conversões.',
            imageUrl: '/images/portfolio/project1.jpg',
            link: 'https://exemplo.com/projeto',
          }}
        />

        // Grid de PortfolioCards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map(item => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>
        ```

        ### 🛠️ ServiceCard

        O componente `ServiceCard` é usado para exibir serviços.

        #### Props

        ```typescript
        interface ServiceCardProps {
          service: Service;
        }
        ```

        #### Implementação

        ```tsx
        const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
          const IconComponent = LucideIcons[service.iconName] as LucideIcons.LucideIcon;

          return (
            <Card className="p-6 h-full flex flex-col">
              <div className="flex items-center mb-4">
                {IconComponent && <IconComponent size={36} className="text-brand-primary mr-4" />}
                <h3 className="text-xl font-semibold text-brand-primary">{service.title}</h3>
              </div>
              <p className="text-brand-text-secondary text-sm mb-3 flex-grow">{service.shortDescription}</p>
              <p className="text-brand-text-secondary text-sm">{service.longDescription}</p>
            </Card>
          );
        };
        ```

        #### Exemplo de Uso

        ```tsx
        // ServiceCard básico
        <ServiceCard
          service={{
            id: '1',
            title: 'Marketing Digital',
            shortDescription: 'Estratégias de marketing digital para aumentar sua presença online.',
            longDescription: 'Desenvolvemos estratégias personalizadas de marketing digital para aumentar sua visibilidade online, gerar leads qualificados e aumentar suas conversões.',
            iconName: 'BarChart',
            categoryId: 'marketing',
            isActive: true,
          }}
        />

        // Grid de ServiceCards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        ```

        ## 🧩 Layouts

        ### 📄 PageLayout

        O componente `PageLayout` é usado como layout base para todas as páginas.

        #### Props

        ```typescript
        interface PageLayoutProps {
          children: React.ReactNode;
          title?: string;
          description?: string;
          showHeader?: boolean;
          showFooter?: boolean;
        }
        ```

        #### Implementação

        ```tsx
        const PageLayout: React.FC<PageLayoutProps> = ({
          children,
          title,
          description,
          showHeader = true,
          showFooter = true,
        }) => {
          const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  
          return (
            <>
              <Head>
                <title>{fullTitle}</title>
                {description && <meta name="description" content={description} />}
              </Head>
      
              <div className="flex flex-col min-h-screen bg-brand-background">
                {showHeader && <Header />}
        
                <main className="flex-grow">
                  {children}
                </main>
        
                {showFooter && <Footer />}
              </div>
            </>
          );
        };
        ```

        #### Exemplo de Uso

        ```tsx
        // Página básica
        <PageLayout
          title="Sobre Nós"
          description="Conheça mais sobre a nossa empresa e nossa missão."
        >
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-6">Sobre Nós</h1>
            <p>Conteúdo da página aqui...</p>
          </div>
        </PageLayout>

        // Página sem header ou footer (ex: página de login)
        <PageLayout
          title="Login"
          showHeader={false}
          showFooter={false}
        >
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
              <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
              {/* Formulário de login aqui */}
            </div>
          </div>
        </PageLayout>
        ```

        ### 📑 SectionLayout

        O componente `SectionLayout` é usado para criar seções dentro de uma página.

        #### Props

        ```typescript
        interface SectionLayoutProps {
          children: React.ReactNode;
          title?: string;
          subtitle?: string;
          className?: string;
          id?: string;
          background?: 'white' | 'light' | 'primary' | 'secondary';
        }
        ```

        #### Implementação

        ```tsx
        const SectionLayout: React.FC<SectionLayoutProps> = ({
          children,
          title,
          subtitle,
          className = '',
          id,
          background = 'white',
        }) => {
          const backgroundStyles = {
            white: 'bg-white',
            light: 'bg-brand-background-alt',
            primary: 'bg-brand-primary text-brand-text-on-primary',
            secondary: 'bg-brand-secondary text-brand-text-on-primary',
          };
  
          return (

            <section id={id} className={`py-16 ${backgroundStyles[background]} ${className}`}>
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {(title || subtitle) && (
                  <div className="text-center mb-12">
                    {title && (
                      <h2 className={`text-3xl font-bold mb-4 ${background === 'white' || background === 'light' ? 'text-brand-primary' : ''}`}>
                        {title}
                      </h2>
                    )}
                    {subtitle && (
                      <p className={`text-xl max-w-3xl mx-auto ${background === 'white' || background === 'light' ? 'text-brand-text-secondary' : ''}`}>
                        {subtitle}
                      </p>
                    )}
                  </div>
                )}
        
                {children}
              </div>
            </section>
          );
        };
        ```

        #### Exemplo de Uso

        ```tsx
        // Seção básica
        <SectionLayout
          title="Nossos Serviços"
          subtitle="Conheça as soluções que oferecemos para impulsionar seu negócio"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cards de serviços aqui */}
          </div>
        </SectionLayout>

        // Seção com fundo colorido
        <SectionLayout
          title="Entre em Contato"
          subtitle="Estamos prontos para ajudar no seu próximo projeto"
          background="primary"
          id="contact"
        >
          <ContactForm />
        </SectionLayout>

        // Seção sem título
        <SectionLayout background="light">
          <Testimonials />
        </SectionLayout>
        ```

        ## 🧩 Componentes de Navegação

        ### 🧭 Header

        O componente `Header` é usado como cabeçalho do site.

        #### Implementação

        ```tsx
        const Header: React.FC = () => {
          const [isMenuOpen, setIsMenuOpen] = useState(false);
          const { pathname } = useLocation();
  
          const toggleMenu = () => {
            setIsMenuOpen(!isMenuOpen);
          };
  
          const closeMenu = () => {
            setIsMenuOpen(false);
          };
  
          const isActive = (path: string) => {
            if (path === '/') {
              return pathname === '/';
            }
            return pathname.startsWith(path);
          };
  
          return (
            <header className="bg-white shadow-sm sticky top-0 z-50">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  {/* Logo */}
                  <Link to="/" className="flex-shrink-0" onClick={closeMenu}>
                    <img src="/logo.svg" alt={SITE_NAME} className="h-8" />
                  </Link>
          
                  {/* Desktop Navigation */}
                  <nav className="hidden md:flex space-x-8">
                    <NavLink to="/" isActive={isActive('/')}>Home</NavLink>
                    <NavLink to="/servicos" isActive={isActive('/servicos')}>Serviços</NavLink>
                    <NavLink to="/portfolio" isActive={isActive('/portfolio')}>Portfólio</NavLink>
                    <NavLink to="/sobre" isActive={isActive('/sobre')}>Sobre</NavLink>
                    <NavLink to="/contato" isActive={isActive('/contato')}>Contato</NavLink>
                  </nav>
          
                  {/* Mobile Menu Button */}
    </
                <li className="flex items-start">
                  <MapPin size={16} className="mt-1 mr-2 flex-shrink-0" />
                  <span className="text-sm opacity-80">
                    {COMPANY_ADDRESS}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-80">
            &copy; {currentYear} {SITE_NAME}. Todos os direitos reservados.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacidade" className="text-sm opacity-80 hover:opacity-100">
              Política de Privacidade
            </Link>
            <Link to="/termos" className="text-sm opacity-80 hover:opacity-100">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
```

### 🍔 MobileMenu

O componente `MobileMenu` é usado para navegação em dispositivos móveis.

#### Props

```typescript
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}
```

#### Implementação

```tsx
const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { pathname } = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Menu Panel */}
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="px-4 py-5 flex items-center justify-between border-b border-brand-border">
          <Link to="/" onClick={onClose}>
            <img src="/logo.svg" alt={SITE_NAME} className="h-8" />
          </Link>
          <button
            type="button"
            className="text-brand-text-secondary hover:text-brand-primary"
            onClick={onClose}
            aria-label="Fechar menu"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md ${
                  isActive('/')
                    ? 'bg-brand-primary-light bg-opacity-10 text-brand-primary'
                    : 'text-brand-text-secondary hover:bg-brand-background-alt'
                }`}
                onClick={onClose}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/servicos"
                className={`block px-3 py-2 rounded-md ${
                  isActive('/servicos')
                    ? 'bg-brand-primary-light bg-opacity-10 text-brand-primary'
                    : 'text-brand-text-secondary hover:bg-brand-background-alt'
                }`}
                onClick={onClose}
              >
                Serviços
              </Link>
            </li>
            <li>
              <Link
                to="/portfolio"
                className={`block px-3 py-2 rounded-md ${
                  isActive('/portfolio')
                    ? 'bg-brand-primary-light bg-opacity-10 text-brand-primary'
                    : 'text-brand-text-secondary hover:bg-brand-background-alt'
                }`}
                onClick={onClose}
              >
                Portfólio
              </Link>
            </li>
            <li>
              <Link
                to="/sobre"
                className={`block px-3 py-2 rounded-md ${
                  isActive('/sobre')
                    ? 'bg-brand-primary-light bg-opacity-10 text-brand-primary'
                    : 'text-brand-text-secondary hover:bg-brand-background-alt'
                }`}
                onClick={onClose}
              >
                Sobre
              </Link>
            </li>
            <li>
              <Link
                to="/contato"
                className={`block px-3 py-2 rounded-md ${
                  isActive('/contato')
                    ? 'bg-brand-primary-light bg-opacity-10 text-brand-primary'
                    : 'text-brand-text-secondary hover:bg-brand-background-alt'
                }`}
                onClick={onClose}
              >
                Contato
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Footer */}
        <div className="px-4 py-6 border-t border-brand-border">
          <Button
            variant="primary"
            className="w-full"
            onClick={() => {
              onClose();
              navigate('/contato');
            }}
          >
            Fale Conosco
          </Button>
        </div>
      </div>
    </div>
  );
};
```

#### Exemplo de Uso

```tsx
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <>
      <header className="bg-white shadow-sm">
        {/* ... conteúdo do header ... */}
        <button
          type="button"
          className="lg:hidden text-brand-text-secondary"
          onClick={toggleMenu}
        >
          <Menu size={24} />
        </button>
      </header>
      
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
```

### 🧭 Breadcrumbs

O componente `Breadcrumbs` é usado para navegação hierárquica.

#### Props

```typescript
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}
```

#### Implementação

```tsx
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/" className="text-brand-text-secondary hover:text-brand-primary">
            <Home size={16} />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight size={16} className="text-brand-text-secondary mx-1" />
            {index === items.length - 1 || !item.href ? (
              <span className="text-sm font-medium text-brand-primary">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href}
                className="text-sm font-medium text-brand-text-secondary hover:text-brand-primary"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
```

#### Exemplo de Uso

```tsx
// Breadcrumbs básico
<Breadcrumbs
  items={[
    { label: 'Serviços', href: '/servicos' },
    { label: 'Marketing Digital' },
  ]}
  className="mb-6"
/>

// Breadcrumbs com múltiplos níveis
<Breadcrumbs
  items={[
    { label: 'Serviços', href: '/servicos' },
    { label: 'Marketing Digital', href: '/servicos/marketing-digital' },
    { label: 'SEO' },
  ]}
/>
```

## 🧩 Componentes de Feedback

### 🔔 Toast

O componente `Toast` é usado para exibir notificações temporárias.

#### Implementação

```tsx
// Contexto do Toast
interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  }, []);
  
  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);
  
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-0 right-0 p-4 z-50 space-y-2 max-w-md">
        {toasts.map(toast => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Componente de Toast individual
interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  const { type, message } = toast;
  
  const typeStyles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: <CheckCircle size={20} className="text-green-500" />,
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: <AlertCircle size={20} className="text-red-500" />,
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: <AlertTriangle size={20} className="text-yellow-500" />,
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: <Info size={20} className="text-blue-500" />,
    },
  };
  
  const styles = typeStyles[type];
  
  return (
    <div
      className={`${styles.bg} ${styles.border} ${styles.text} border rounded-md shadow-lg p-4 flex items-start animate-slide-up`}
      role="alert"
    >
      <div className="flex-shrink-0 mr-3">
        {styles.icon}
      </div>
      <div className="flex-1">
        {message}
      </div>
      <button
        type="button"
        className="ml-4 text-gray-400 hover:text-gray-600"
        onClick={onClose}
        aria-label="Fechar"
      >
        <X size={16} />
      </button>
    </div>
  );
};
```

#### Exemplo de Uso

```tsx
// No componente App
const App: React.FC = () => {
  return (
    <ToastProvider>
      <Router>
        {/* ... rotas ... */}
      </Router>
    </ToastProvider>
  );
};

// Em qualquer componente
const MyComponent: React.FC = () => {
  const { showToast } = useToast();
  
  const handleSuccess = () => {
    showToast('Operação realizada com sucesso!', 'success');
  };
  
  const handleError = () => {
    showToast('Ocorreu um erro ao processar sua solicitação.', 'error');
  };
  
  return (
    <div>
      <Button onClick={handleSuccess}>Mostrar Sucesso</Button>
      <Button onClick={handleError}>Mostrar Erro</Button>
      <Button onClick={() => showToast('Esta é uma informação importante.', 'info')}>
        Mostrar Info
      </Button>
      <Button onClick={() => showToast('Atenção! Isso requer sua atenção.', 'warning')}>
        Mostrar Aviso
      </Button>
    </div>
  );
};
```

### ⏳ LoadingOverlay

O componente `LoadingOverlay` é usado para indicar carregamento em toda a página ou seção.

#### Props

```typescript
interface LoadingOverlayProps {
  isLoading: boolean;
  text?: string;
  transparent?: boolean;
}
```

#### Implementação

```tsx
const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  text = 'Carregando...',
  transparent = false,
}) => {
  if (!isLoading) return null;
  
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${transparent ? 'bg-white bg-opacity-70' : 'bg-white'}`}>
      <div className="text-center">
        <Spinner size="lg" className="mx-auto" />
        {text && <p className="mt-4 text-brand-text-secondary">{text}</p>}
      </div>
    </div>
  );
};
```

#### Exemplo de Uso

```tsx
// LoadingOverlay bás
