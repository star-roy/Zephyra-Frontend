// Interactive Rule-Based Chatbot Service
class ChatBotService {

  // Main response method
  async getResponse(userMessage, selectedOption = null) {
    try {
      return this.getInteractiveResponse(userMessage, selectedOption);
    } catch (error) {
      console.error('Chatbot error:', error);
      return {
        text: "I apologize, but I encountered an issue. Please try asking your question again.",
        options: []
      };
    }
  }

  getInteractiveResponse(userMessage, selectedOption = null) {
    const message = userMessage.toLowerCase().trim();

    if (selectedOption) {
      return this.handleOptionSelection(selectedOption);
    }

    // Welcome messages for first-time visitors
    if (message.includes('what is zephyra') || message.includes('about zephyra') || message.includes('platform')) {
      return {
        text: "Welcome to Zephyra! We're a quest-based learning platform where adventure meets education. What interests you most?",
        options: [
          { id: 'how-zephyra-works', text: '🎮 How Zephyra works' },
          { id: 'getting-started', text: '🚀 Getting started guide' },
          { id: 'platform-features', text: '✨ Platform features' },
          { id: 'why-join', text: '💡 Why join Zephyra' },
          { id: 'success-stories', text: '🌟 Success stories' }
        ]
      };
    }

    // Quest-related responses with options
    if (message.includes('quest') || message.includes('adventure')) {
      return {
        text: "I can help you with quests! What would you like to know?",
        options: [
          { id: 'what-are-quests', text: '❓ What are quests?' },
          { id: 'create-quest', text: '🎯 How to create a quest' },
          { id: 'find-quest', text: '🔍 How to find quests' },
          { id: 'start-quest', text: '▶️ How to start a quest' },
          { id: 'complete-quest', text: '✅ How to complete a quest' },
          { id: 'quest-categories', text: '📂 Quest categories' }
        ]
      };
    }

    // Badge-related responses with options
    if (message.includes('badge') || message.includes('achievement')) {
      return {
        text: "Badges are exciting rewards! What would you like to know?",
        options: [
          { id: 'earn-badges', text: '🏆 How to earn badges' },
          { id: 'view-badges', text: '👀 How to view my badges' },
          { id: 'badge-types', text: '🎖️ Types of badges' },
          { id: 'badge-requirements', text: '📋 Badge requirements' }
        ]
      };
    }

    // XP-related responses with options
    if (message.includes('xp') || message.includes('points') || message.includes('level') || message.includes('experience')) {
      return {
        text: "XP and leveling system! What interests you?",
        options: [
          { id: 'earn-xp', text: '📈 How to earn XP' },
          { id: 'check-xp', text: '📊 Check my XP & level' },
          { id: 'xp-rewards', text: '🎁 XP rewards explained' },
          { id: 'level-benefits', text: '⭐ Level benefits' }
        ]
      };
    }

    // Social features with options
    if (message.includes('friend') || message.includes('social') || message.includes('connect')) {
      return {
        text: "Social features make questing more fun! What can I help with?",
        options: [
          { id: 'add-friends', text: '➕ Add friends' },
          { id: 'invite-friends', text: '💌 Invite friends to quests' },
          { id: 'social-questing', text: '👥 Social questing tips' },
          { id: 'find-community', text: '🌐 Find community' }
        ]
      };
    }

    // Account-related with options
    if (message.includes('account') || message.includes('profile') || message.includes('setting')) {
      return {
        text: "Account and profile management! What do you need help with?",
        options: [
          { id: 'edit-profile', text: '✏️ Edit profile' },
          { id: 'privacy-settings', text: '🔒 Privacy settings' },
          { id: 'account-security', text: '🛡️ Account security' },
          { id: 'delete-account', text: '❌ Delete account' }
        ]
      };
    }

    // Technical support with options
    if (message.includes('help') || message.includes('support') || message.includes('problem')) {
      return {
        text: "I'm here to help! What kind of assistance do you need?",
        options: [
          { id: 'technical-issue', text: '🔧 Technical problems' },
          { id: 'how-to-use', text: '📚 How to use Zephyra' },
          { id: 'report-bug', text: '🐛 Report a bug' },
          { id: 'contact-support', text: '📞 Contact support' }
        ]
      };
    }

    // Greetings with main menu options
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('start') || message === '') {
      const greetings = [
        "Hello! Welcome to Zephyra! 🌟",
        "Hi there, adventurer! 🎒",
        "Hey! Ready for adventure? 🗺️"
      ];
      const greeting = greetings[Math.floor(Math.random() * greetings.length)];
      
      return {
        text: `${greeting} I'm your assistant. What can I help you with?`,
        options: [
          { id: 'about-quests', text: '🎯 About Quests' },
          { id: 'about-badges', text: '🏆 About Badges' },
          { id: 'about-xp', text: '📈 About XP & Levels' },
          { id: 'social-features', text: '👥 Social Features' },
          { id: 'account-help', text: '⚙️ Account Help' },
          { id: 'get-started', text: '🚀 Getting Started' }
        ]
      };
    }

    // Thank you responses
    if (message.includes('thank') || message.includes('thanks')) {
      const thanks = [
        "You're welcome! 😊",
        "Glad I could help! 🎉", 
        "My pleasure! 🌟"
      ];
      return {
        text: `${thanks[Math.floor(Math.random() * thanks.length)]} Need anything else?`,
        options: [
          { id: 'main-menu', text: '🏠 Main Menu' },
          { id: 'more-help', text: '❓ More Help' }
        ]
      };
    }

    // Default response with comprehensive options for newcomers
    return {
      text: "I'm here to help with everything Zephyra! Whether you're exploring for the first time or need specific help, I've got you covered. What interests you?",
      options: [
        { id: 'new-to-zephyra', text: '🌟 New to Zephyra?' },
        { id: 'about-quests', text: '🎯 About Quests' },
        { id: 'about-badges', text: '🏆 About Badges' },
        { id: 'about-xp', text: '📈 About XP & Levels' },
        { id: 'getting-started', text: '🚀 Getting Started' },
        { id: 'social-features', text: '👥 Community Features' },
        { id: 'account-help', text: '⚙️ Account Help' }
      ]
    };
  }

  // Handle when user clicks an option
  handleOptionSelection(optionId) {
    switch (optionId) {
      case 'new-to-zephyra':
        return {
          text: "Welcome to Zephyra! 🌟 We're a unique quest-based learning platform that turns education into adventure. Think of us as a game where you learn by doing real-world activities!",
          options: [
            { id: 'how-zephyra-works', text: '🎮 How does it work?' },
            { id: 'why-join', text: '💡 Why should I join?' },
            { id: 'getting-started', text: '🚀 How to get started' },
            { id: 'platform-features', text: '✨ What features do you have?' },
            { id: 'success-stories', text: '🌟 Success stories' }
          ]
        };

      case 'how-zephyra-works':
        return {
          text: "Here's how Zephyra works:\n\n🎯 **Choose Quests**: Pick from categories like Art, Science, Adventure, Community Service\n📋 **Complete Tasks**: Follow step-by-step instructions\n📸 **Submit Proof**: Share photos/descriptions of your progress\n🏆 **Earn Rewards**: Get XP, badges, and climb leaderboards\n👥 **Connect**: Meet like-minded learners in your community!",
          options: [
            { id: 'quest-examples', text: '📋 See quest examples' },
            { id: 'getting-started', text: '🚀 Ready to start?' },
            { id: 'platform-features', text: '✨ More features' },
            { id: 'main-menu', text: '🏠 Back to menu' }
          ]
        };

      case 'why-join':
        return {
          text: "Why join Zephyra?\n\n🧠 **Learn by Doing**: No boring textbooks - learn through real experiences\n🌍 **Real Impact**: Many quests help your community\n🏆 **Recognition**: Earn badges and showcase achievements\n👥 **Community**: Connect with fellow adventurers\n🎯 **Personal Growth**: Develop new skills and hobbies\n📈 **Track Progress**: See your learning journey visualized",
          options: [
            { id: 'success-stories', text: '🌟 Read success stories' },
            { id: 'getting-started', text: '🚀 I\'m convinced! How to start?' },
            { id: 'platform-features', text: '✨ What else can I do?' },
            { id: 'main-menu', text: '🏠 Back to menu' }
          ]
        };

      case 'getting-started':
        return {
          text: "Getting started is super easy! 🚀\n\n**For Free Exploration:**\n1. Browse quests on our Explore page\n2. Read descriptions and requirements\n3. Check out community features\n\n**To Participate:**\n1. Click 'Sign Up' (it's free!)\n2. Choose your interests\n3. Pick your first quest\n4. Start your adventure!\n\n**Pro Tip:** Start with easy quests to get familiar with the platform!",
          options: [
            { id: 'first-quest-suggestions', text: '🎯 Suggest my first quest' },
            { id: 'signup-help', text: '📝 Help with signing up' },
            { id: 'quest-categories', text: '📂 Browse quest categories' },
            { id: 'main-menu', text: '🏠 Back to menu' }
          ]
        };

      case 'platform-features':
        return {
          text: "Zephyra Features Overview:\n\n🎯 **Quest System**: Create & join learning adventures\n🏆 **Badges & Achievements**: Showcase your accomplishments\n📈 **XP & Leveling**: Track your progress gamification-style\n👥 **Social Features**: Friends, following, community discussions\n📍 **Location-Based**: Find local quests and events\n🎨 **Creative Tools**: Upload photos, write reflections\n🔒 **Privacy Controls**: Your data, your choice\n📱 **Mobile Friendly**: Adventure anywhere!",
          options: [
            { id: 'about-quests', text: '🎯 More about quests' },
            { id: 'about-badges', text: '🏆 More about badges' },
            { id: 'social-features', text: '👥 Social features' },
            { id: 'main-menu', text: '🏠 Back to menu' }
          ]
        };

      case 'success-stories':
        return {
          text: "Real Zephyra Success Stories! 🌟\n\n📚 **Sarah, Age 16**: \"I discovered my love for photography through Art quests. Now I'm planning to study visual arts in college!\"\n\n🌱 **Mike, Age 24**: \"Community Service quests helped me volunteer at local gardens. I've made friends and learned urban farming!\"\n\n🔬 **Emma, Age 19**: \"Science quests made chemistry fun! I went from struggling in class to tutoring other students.\"\n\n🏃‍♂️ **Alex, Age 22**: \"Adventure quests got me hiking, rock climbing, and exploring my city like never before!\"",
          options: [
            { id: 'getting-started', text: '🚀 I want to start too!' },
            { id: 'quest-categories', text: '📂 What quests are available?' },
            { id: 'about-badges', text: '🏆 What rewards can I earn?' },
            { id: 'main-menu', text: '🏠 Back to menu' }
          ]
        };

      case 'first-quest-suggestions':
        return {
          text: "Perfect First Quests for Beginners! 🎯\n\n🎨 **Art Newbie**: \"Draw Your Neighborhood\" - Simple sketching quest\n🌱 **Green Thumb**: \"Start a Windowsill Garden\" - Easy indoor plants\n📸 **Photo Walk**: \"Capture Your Day\" - Beginner photography\n👥 **Community Helper**: \"Compliment Challenge\" - Spread kindness\n🍳 **Kitchen Explorer**: \"Cook a New Recipe\" - Basic cooking skills\n📚 **Book Lover**: \"Read & Review\" - Share your favorite book\n\nThese are designed to be completed in 1-3 days!",
          options: [
            { id: 'quest-categories', text: '📂 See all categories' },
            { id: 'signup-help', text: '📝 Help me sign up' },
            { id: 'about-quests', text: '🎯 Learn more about quests' },
            { id: 'main-menu', text: '🏠 Back to menu' }
          ]
        };

      case 'signup-help':
        return {
          text: "Signing up is quick and easy! 📝\n\n**What you need:**\n• Valid email address\n• Choose a username\n• Create a secure password\n\n**What happens next:**\n• Email verification (check your inbox!)\n• Choose your interests\n• Get personalized quest recommendations\n• Start your first adventure!\n\n**Privacy:** We protect your data and you control what's shared publicly.",
          options: [
            { id: 'privacy-info', text: '🔒 Privacy information' },
            { id: 'getting-started', text: '🚀 Back to getting started' },
            { id: 'first-quest-suggestions', text: '🎯 Quest suggestions' },
            { id: 'main-menu', text: '🏠 Back to menu' }
          ]
        };

      case 'quest-examples':
        return {
          text: "Popular Quest Examples! 📋\n\n🎨 **\"Street Art Photography\"**: Document murals in your city\n🌿 **\"Urban Nature Hunt\"**: Find and photograph 10 plants\n🍳 **\"Cultural Cooking Journey\"**: Try recipes from 3 countries\n📚 **\"Little Free Library\"**: Set up a book exchange\n🏃‍♂️ **\"Fitness Challenge\"**: 30-day exercise routine\n🎵 **\"Learn an Instrument\"**: Basic guitar or piano\n🌟 **\"Random Acts of Kindness\"**: Spread positivity\n🔬 **\"Home Science Lab\"**: Safe experiments",
          options: [
            { id: 'quest-categories', text: '📂 Browse all categories' },
            { id: 'start-quest', text: '▶️ How to start a quest' },
            { id: 'getting-started', text: '🚀 Ready to join?' },
            { id: 'main-menu', text: '🏠 Back to menu' }
          ]
        };

      case 'what-are-quests':
        return {
          text: "What are Quests? 🎯\n\nQuests are structured learning adventures that combine education with real-world activities!\n\n**Structure:**\n• Clear objectives and tasks\n• Step-by-step instructions\n• Proof submission requirements\n• Estimated time to complete\n\n**Types:**\n• Educational (learn new skills)\n• Creative (art, writing, music)\n• Physical (sports, outdoor activities)\n• Community (volunteering, social impact)\n• Personal (self-improvement, hobbies)",
          options: [
            { id: 'quest-examples', text: '📋 See examples' },
            { id: 'create-quest', text: '🎯 How to create one' },
            { id: 'find-quest', text: '🔍 How to find quests' },
            { id: 'main-menu', text: '🏠 Back to menu' }
          ]
        };

      // Quest options
      case 'about-quests':
        return {
          text: "Quests are adventures you can create or join! What specifically interests you?",
          options: [
            { id: 'create-quest', text: '🎯 Create a quest' },
            { id: 'find-quest', text: '🔍 Find quests' },
            { id: 'quest-categories', text: '📂 Quest categories' }
          ]
        };
      
      case 'create-quest':
        return {
          text: "To create a quest:\n1. Go to 'My Quests' → 'Create New Quest'\n2. Fill in title, description, category\n3. Add tasks and photos\n4. Submit for review\n\nYour quest will be live once approved!",
          options: [
            { id: 'quest-categories', text: '📂 What categories are available?' },
            { id: 'quest-tips', text: '💡 Quest creation tips' },
            { id: 'main-menu', text: '🏠 Main Menu' }
          ]
        };

      case 'find-quest':
        return {
          text: "Finding quests is easy!\n• Browse categories on Explore page\n• Use the search bar\n• Check Featured & Popular sections\n• Filter by difficulty and location",
          options: [
            { id: 'quest-categories', text: '📂 View categories' },
            { id: 'start-quest', text: '▶️ How to start a quest' },
            { id: 'main-menu', text: '🏠 Main Menu' }
          ]
        };

      case 'start-quest':
        return {
          text: "Starting a quest:\n1. Click on any quest card\n2. Read the description carefully\n3. Hit 'Start Quest' button\n4. Follow task instructions\n5. Submit proof for each task",
          options: [
            { id: 'complete-quest', text: '✅ How to complete' },
            { id: 'quest-tips', text: '💡 Quest tips' },
            { id: 'main-menu', text: '🏠 Main Menu' }
          ]
        };

      case 'complete-quest':
        return {
          text: "Completing quests:\n• Finish all required tasks\n• Submit proof (photos, descriptions)\n• Wait for verification\n• Earn XP and unlock badges!\n• Check progress in quest details",
          options: [
            { id: 'about-xp', text: '📈 About XP rewards' },
            { id: 'about-badges', text: '🏆 About badges' },
            { id: 'main-menu', text: '🏠 Main Menu' }
          ]
        };

      case 'quest-categories':
        return {
          text: "Zephyra has 6 exciting categories:\n🎨 Art - Creative & artistic quests\n🍕 Food - Culinary adventures\n🏛️ History - Historical discoveries\n🎭 Culture - Cultural experiences\n🏔️ Adventure - Outdoor adventures\n💎 Hidden Gems - Secret local spots",
          options: [
            { id: 'find-quest', text: '🔍 How to find quests' },
            { id: 'about-badges', text: '🏆 Category badges' },
            { id: 'main-menu', text: '🏠 Main Menu' }
          ]
        };

      // Badge options
      case 'about-badges':
        return {
          text: "Badges show your achievements! Each category has bronze, silver, gold, and legendary badges based on XP earned.",
          options: [
            { id: 'earn-badges', text: '🏆 How to earn badges' },
            { id: 'view-badges', text: '👀 View my badges' },
            { id: 'badge-types', text: '🎖️ Badge types' }
          ]
        };

      case 'earn-badges':
        return {
          text: "Earning badges:\n• Complete quests in any category\n• Earn category-specific XP\n• Reach XP thresholds for badge tiers\n• Bronze → Silver → Gold → Legendary",
          options: [
            { id: 'about-xp', text: '📈 About XP' },
            { id: 'view-badges', text: '👀 Check my progress' },
            { id: 'main-menu', text: '🏠 Main Menu' }
          ]
        };

      case 'view-badges':
        return {
          text: "Check your badges in your Profile section! You'll see:\n• All earned badges\n• Progress toward next tiers\n• Category-specific achievements\n• Show them off to other adventurers!",
          options: [
            { id: 'edit-profile', text: '✏️ Edit profile' },
            { id: 'about-xp', text: '📈 About XP' },
            { id: 'main-menu', text: '🏠 Main Menu' }
          ]
        };

      // XP options
      case 'about-xp':
        return {
          text: "XP (Experience Points) are earned by completing quests! Each quest rewards different XP based on difficulty and category.",
          options: [
            { id: 'earn-xp', text: '📈 How to earn XP' },
            { id: 'check-xp', text: '📊 Check my XP' },
            { id: 'level-benefits', text: '⭐ Level benefits' }
          ]
        };

      case 'earn-xp':
        return {
          text: "Earning XP:\n• Complete any quest\n• More challenging = more XP\n• Earn both total XP and category XP\n• Category XP counts toward badges",
          options: [
            { id: 'about-badges', text: '🏆 About badges' },
            { id: 'quest-categories', text: '📂 Quest categories' },
            { id: 'main-menu', text: '🏠 Main Menu' }
          ]
        };

      // Social features
      case 'social-features':
        return {
          text: "Connect with fellow adventurers! Zephyra is all about community and shared experiences.",
          options: [
            { id: 'add-friends', text: '➕ Add friends' },
            { id: 'social-questing', text: '👥 Social questing' },
            { id: 'find-community', text: '🌐 Find community' }
          ]
        };

      case 'add-friends':
        return {
          text: "Adding friends:\n• Search by username\n• Meet people during quests\n• Connect at popular quest locations\n• Build your adventure network!",
          options: [
            { id: 'social-questing', text: '👥 Quest with friends' },
            { id: 'main-menu', text: '🏠 Main Menu' }
          ]
        };

      // Account help
      case 'account-help':
        return {
          text: "Account management made easy! What do you need help with?",
          options: [
            { id: 'edit-profile', text: '✏️ Edit profile' },
            { id: 'privacy-settings', text: '🔒 Privacy settings' },
            { id: 'account-security', text: '🛡️ Security' }
          ]
        };

      case 'edit-profile':
        return {
          text: "Edit your profile:\n• Go to Settings → Profile Settings\n• Update avatar, bio, display name\n• Add personal information\n• Make your profile reflect your adventurous spirit!",
          options: [
            { id: 'privacy-settings', text: '🔒 Privacy settings' },
            { id: 'main-menu', text: '🏠 Main Menu' }
          ]
        };

      // Getting started
      case 'get-started':
        return {
          text: "Welcome to Zephyra! Here's how to get started:\n1. Complete your profile\n2. Browse quest categories\n3. Start with beginner-friendly quests\n4. Connect with other adventurers\n5. Earn your first badges!",
          options: [
            { id: 'about-quests', text: '🎯 Learn about quests' },
            { id: 'quest-categories', text: '📂 Browse categories' },
            { id: 'social-features', text: '👥 Meet adventurers' }
          ]
        };

      // Technical support
      case 'technical-issue':
        return {
          text: "Having technical problems?\n1. Try refreshing the page\n2. Clear browser cache\n3. Check internet connection\n4. Contact support if issues persist",
          options: [
            { id: 'report-bug', text: '🐛 Report a bug' },
            { id: 'contact-support', text: '📞 Contact support' },
            { id: 'main-menu', text: '🏠 Main Menu' }
          ]
        };

      case 'contact-support':
        return {
          text: "Need more help? Our support team is here for you!\n\n📧 Email: support@zephyra.com\n⏰ Response time: 24-48 hours\n\nInclude details about your issue for faster assistance.",
          options: [
            { id: 'main-menu', text: '🏠 Main Menu' },
            { id: 'more-help', text: '❓ More Help' }
          ]
        };

      // Navigation
      case 'main-menu':
        return {
          text: "Main Menu - What can I help you with?",
          options: [
            { id: 'about-quests', text: '🎯 About Quests' },
            { id: 'about-badges', text: '🏆 About Badges' },
            { id: 'about-xp', text: '📈 About XP & Levels' },
            { id: 'social-features', text: '👥 Social Features' },
            { id: 'account-help', text: '⚙️ Account Help' }
          ]
        };

      case 'more-help':
        return {
          text: "I'm here to help! What else can I assist you with?",
          options: [
            { id: 'about-quests', text: '🎯 Quests' },
            { id: 'about-badges', text: '🏆 Badges' },
            { id: 'social-features', text: '👥 Social' },
            { id: 'technical-issue', text: '🔧 Technical help' },
            { id: 'contact-support', text: '📞 Contact support' }
          ]
        };

      default:
        return {
          text: "I'm not sure about that option. Let me help you with something else!",
          options: [
            { id: 'main-menu', text: '🏠 Main Menu' },
            { id: 'more-help', text: '❓ More Help' }
          ]
        };
    }
  }
}

// Export singleton instance
export const chatBotService = new ChatBotService();
export default ChatBotService;
