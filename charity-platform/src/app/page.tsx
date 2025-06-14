'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { 
  Heart, 
  Users, 
  Target, 
  TrendingUp, 
  Shield, 
  Globe,
  Star,
  ArrowRight,
  CheckCircle,
  DollarSign
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useWalletContext } from '@/context/wallet-context';
import { formatNumber } from '@/lib/utils';

interface PlatformStats {
  totalDonations: number;
  totalUsers: number;
  activeProjects: number;
  zakatDistributed: number;
}

export default function HomePage() {
  const { connected } = useWalletContext();
  const [stats, setStats] = useState<PlatformStats>({
    totalDonations: 1250000,
    totalUsers: 15420,
    activeProjects: 89,
    zakatDistributed: 320000,
  });

  const features = [
    {
      icon: Shield,
      title: 'Прозрачность на блокчейне',
      description: 'Все транзакции записываются в блокчейн Solana для полной прозрачности',
    },
    {
      icon: Heart,
      title: 'Соответствие Шариату',
      description: 'Все проекты проверяются на соответствие исламским принципам',
    },
    {
      icon: Users,
      title: 'Голосование сообщества',
      description: 'Держатели токенов участвуют в распределении средств Закята',
    },
    {
      icon: Target,
      title: 'Целевое финансирование',
      description: 'Поэтапное финансирование халяльных проектов с отчетностью',
    },
  ];

  const testimonials = [
    {
      name: 'Ахмед аль-Хасани',
      role: 'Благотворительная организация',
      text: 'Платформа помогла нам собрать средства для строительства медицинского центра. Прозрачность блокчейна дала уверенность донорам.',
    },
    {
      name: 'Фатима Заhra',
      role: 'Получатель помощи',
      text: 'Благодаря платформе я смогла получить необходимую медицинскую помощь. Процесс был быстрым и прозрачным.',
    },
    {
      name: 'Омар Ибрагим',
      role: 'Предприниматель',
      text: 'Запустил свой халяльный проект через платформу. Сообщество поддержало идею, и теперь бизнес развивается успешно.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 islamic-pattern">
      {/* Hero Section */}
      <section className="relative px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              <span className="block text-green-600">بِسْمِ اللَّهِ</span>
              <span className="block">Платформа Благотворительности</span>
              <span className="block text-3xl sm:text-4xl lg:text-5xl text-gray-600 font-normal">
                на блокчейне Solana
              </span>
            </h1>
            
            <p className="max-w-3xl mx-auto text-xl text-gray-600 sm:text-2xl">
              Прозрачное распределение Закята и Садаки, финансирование халяльных проектов 
              с полным соответствием исламским принципам
            </p>

            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-center">
              {!connected ? (
                <WalletMultiButton className="!bg-green-600 hover:!bg-green-700" />
              ) : (
                <Link href="/dashboard">
                  <Button size="xl" variant="default">
                    Открыть Dashboard
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              )}
              
              <Link href="/about">
                <Button size="xl" variant="outline">
                  Узнать больше
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 gap-8 mt-20 lg:grid-cols-4"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 sm:text-4xl">
              ${formatNumber(stats.totalDonations)}
            </div>
            <div className="text-sm text-gray-600 sm:text-base">Всего пожертвований</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 sm:text-4xl">
              {formatNumber(stats.totalUsers)}
            </div>
            <div className="text-sm text-gray-600 sm:text-base">Активных пользователей</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 sm:text-4xl">
              {stats.activeProjects}
            </div>
            <div className="text-sm text-gray-600 sm:text-base">Активных проектов</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 sm:text-4xl">
              ${formatNumber(stats.zakatDistributed)}
            </div>
            <div className="text-sm text-gray-600 sm:text-base">Закят распределен</div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              Особенности платформы
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Современные технологии на службе исламской благотворительности
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full transition-transform hover:scale-105">
                  <CardHeader className="text-center">
                    <feature.icon className="w-12 h-12 mx-auto text-green-600" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-green-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              Как это работает
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Простой и прозрачный процесс благотворительности
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Подключите кошелек</h3>
              <p className="text-gray-600">
                Подключите свой Solana кошелек (Phantom, Solflare) для начала работы
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Выберите направление</h3>
              <p className="text-gray-600">
                Подайте заявку на помощь, создайте проект или проголосуйте за распределение Закята
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Участвуйте в сообществе</h3>
              <p className="text-gray-600">
                Делайте пожертвования, получайте charity-токены и участвуйте в управлении
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              Отзывы участников
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Истории тех, кто уже использует нашу платформу
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 mosque-gradient">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Присоединяйтесь к исламской
              <br />
              благотворительности будущего
            </h2>
            
            <p className="max-w-2xl mx-auto text-xl text-green-100">
              Начните делать добро уже сегодня. Каждое пожертвование записывается 
              в блокчейн для полной прозрачности и доверия.
            </p>

            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-center">
              {!connected ? (
                <WalletMultiButton className="!bg-white !text-green-600 hover:!bg-green-50" />
              ) : (
                <Link href="/dashboard">
                  <Button size="xl" className="bg-white text-green-600 hover:bg-green-50">
                    Начать сейчас
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="text-2xl font-bold text-white mb-4">
                Charity Platform
              </div>
              <p className="text-gray-400">
                Исламская благотворительная платформа на блокчейне Solana
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Платформа</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/zakat" className="hover:text-white">Закят</Link></li>
                <li><Link href="/sadaqah" className="hover:text-white">Садака</Link></li>
                <li><Link href="/projects" className="hover:text-white">Проекты</Link></li>
                <li><Link href="/voting" className="hover:text-white">Голосование</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Поддержка</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Помощь</Link></li>
                <li><Link href="/docs" className="hover:text-white">Документация</Link></li>
                <li><Link href="/contact" className="hover:text-white">Контакты</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Правовая информация</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Конфиденциальность</Link></li>
                <li><Link href="/terms" className="hover:text-white">Условия</Link></li>
                <li><Link href="/sharia" className="hover:text-white">Соответствие Шариату</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">
              © 2024 Charity Platform. Все права защищены. 
              <span className="text-green-400"> الحمد لله</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
